const BASE = "https://api.jikan.moe/v4";

export type JikanAnime = {
    mal_id: number;
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    year: number | null;
    episodes: number | null;
    score: number | null;
    synopsis: string | null;
    genres: { name: string }[];
    images: {
        jpg: {
            image_url: string;
            large_image_url: string;
        };
    };
};

export type JikanCharacter = {
    mal_id: number;
    name: string;
    name_kanji: string | null;
    nicknames: string[];
    favorites: number;
    about: string | null;
    images: {
        jpg: {
            image_url: string;
        };
    };
};

type Page<T> = { data: T[] };

// Next aborts a prerender that runs past 60s, so every retry schedule below
// has to finish inside that budget — otherwise the page is killed before the
// empty-list fallback can return and the whole build fails.
const RETRY_BUDGET_MS = 35_000;
const REQUEST_TIMEOUT_MS = 8_000;

const isBuild = () =>
    !!process.env.CI || process.env.npm_lifecycle_event === "build";

async function jikan<T>(path: string, revalidate = 3600): Promise<T> {
    const deadline = Date.now() + RETRY_BUDGET_MS;

    // Vercel fires several requests in the same millisecond via Promise.all(),
    // instantly hitting Jikan's 3 req/s limit. A short random stagger breaks
    // up that burst without eating much of the budget.
    if (isBuild()) {
        await new Promise((r) => setTimeout(r, Math.random() * 2000));
    }

    let lastErr: unknown;
    for (let attempt = 0; ; attempt++) {
        let retryable = true;
        try {
            const res = await fetch(`${BASE}${path}`, {
                next: { revalidate },
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
            });
            if (res.ok) return res.json();
            // 429 is the rate limit; 5xx is worth another shot. Anything else
            // (404, 400) will fail the same way every time.
            retryable = res.status === 429 || res.status >= 500;
            lastErr = new Error(`Jikan ${path} → ${res.status}`);
        } catch (err) {
            // Connect timeouts and aborts land here and are always retryable.
            lastErr = err;
        }

        const backoff = 1000 * 2 ** attempt + Math.random() * 500;
        if (!retryable || Date.now() + backoff >= deadline) break;
        await new Promise((r) => setTimeout(r, backoff));
    }
    throw lastErr ?? new Error(`Jikan ${path} → exhausted retries`);
}

// Same reasoning as jikanList, for the AniList GraphQL endpoint.
async function anilistQuery(
    query: string,
    variables: Record<string, number>,
): Promise<{ data?: { Page?: { media?: unknown[] } } } | null> {
    try {
        const res = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("[anilist] query failed:", err);
        return null;
    }
}

// A prerendered page must never take the whole build down because MAL is
// having a bad day. Fall back to an empty list; ISR refills it on the next
// revalidate once the API recovers.
async function jikanList<T>(path: string, revalidate = 3600): Promise<T[]> {
    try {
        const { data } = await jikan<Page<T>>(path, revalidate);
        return data;
    } catch (err) {
        console.error(`[jikan] falling back to empty list for ${path}:`, err);
        return [];
    }
}

export async function getTopAnime(limit = 24, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?limit=${limit}&page=${page}`);
}

// AniList's TRENDING_DESC — actually shifts day-to-day based on community
// activity. Returned in the JikanAnime shape so existing card components
// work unchanged.
export async function getTrendingAnime(limit = 12): Promise<JikanAnime[]> {
    const gql = `
        query Trending($perPage: Int!) {
            Page(perPage: $perPage) {
                media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
                    idMal
                    title { romaji english native }
                    seasonYear
                    episodes
                    averageScore
                    genres
                    coverImage { large extraLarge }
                }
            }
        }
    `;
    const json = await anilistQuery(gql, { perPage: limit });
    type AniListMedia = {
        idMal: number | null;
        title: { romaji: string; english: string | null; native: string | null };
        seasonYear: number | null;
        episodes: number | null;
        averageScore: number | null;
        genres: string[];
        coverImage: { large: string; extraLarge: string | null };
    };
    const media = (json?.data?.Page?.media ?? []) as AniListMedia[];
    return media
        .filter((m) => m.idMal !== null)
        .map<JikanAnime>((m) => ({
            mal_id: m.idMal as number,
            title: m.title.english ?? m.title.romaji,
            title_english: m.title.english,
            title_japanese: m.title.native,
            year: m.seasonYear,
            episodes: m.episodes,
            score: m.averageScore !== null ? m.averageScore / 10 : null,
            synopsis: null,
            genres: m.genres.map((name) => ({ name })),
            images: {
                jpg: {
                    image_url: m.coverImage.large,
                    large_image_url: m.coverImage.extraLarge ?? m.coverImage.large,
                },
            },
        }));
}

export const GENRE_FILTERS = [
    { slug: "all", label: "All", id: null },
    { slug: "action", label: "Action", id: 1 },
    { slug: "adventure", label: "Adventure", id: 2 },
    { slug: "drama", label: "Drama", id: 8 },
    { slug: "fantasy", label: "Fantasy", id: 10 },
    { slug: "romance", label: "Romance", id: 22 },
    { slug: "sci-fi", label: "Sci-Fi", id: 24 },
] as const;

export type GenreSlug = (typeof GENRE_FILTERS)[number]["slug"];

export async function searchAnime(
    query: string,
    limit = 24,
    page = 1,
): Promise<JikanAnime[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const params = new URLSearchParams({
        q: trimmed,
        limit: String(limit),
        page: String(page),
        order_by: "score",
        sort: "desc",
        sfw: "true",
    });
    return jikanList<JikanAnime>(`/anime?${params.toString()}`, 600);
}

export async function getAnimeByGenre(
    slug: GenreSlug,
    limit = 24,
    page = 1,
): Promise<JikanAnime[]> {
    const filter = GENRE_FILTERS.find((f) => f.slug === slug) ?? GENRE_FILTERS[0];
    if (filter.id === null) {
        const params = new URLSearchParams({
            limit: String(limit),
            page: String(page),
        });
        return jikanList<JikanAnime>(`/top/anime?${params.toString()}`);
    }

    const params = new URLSearchParams({
        genres: String(filter.id),
        order_by: "score",
        sort: "desc",
        limit: String(limit),
        page: String(page),
        min_score: "7",
        sfw: "true",
    });
    return jikanList<JikanAnime>(`/anime?${params.toString()}`);
}

export async function getSeasonNow(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/seasons/now?limit=${limit}&page=${page}`);
}

export async function getSeasonUpcoming(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/seasons/upcoming?limit=${limit}&page=${page}`);
}

// MAL's filter variants on /top/anime — different curated rankings
export async function getTopAiring(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?filter=airing&limit=${limit}&page=${page}`);
}

export async function getTopUpcoming(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?filter=upcoming&limit=${limit}&page=${page}`);
}

export async function getMostPopular(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?filter=bypopularity&limit=${limit}&page=${page}`);
}

export async function getMostFavorited(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?filter=favorite&limit=${limit}&page=${page}`);
}

export async function getTopMovies(limit = 12, page = 1): Promise<JikanAnime[]> {
    return jikanList<JikanAnime>(`/top/anime?type=movie&limit=${limit}&page=${page}`);
}

// Adapter for the trending feed so the catalog page can paginate through it.
export async function getTrendingAnimePage(limit = 24, page = 1): Promise<JikanAnime[]> {
    const gql = `
        query Trending($perPage: Int!, $page: Int!) {
            Page(perPage: $perPage, page: $page) {
                media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
                    idMal
                    title { romaji english native }
                    seasonYear
                    episodes
                    averageScore
                    genres
                    coverImage { large extraLarge }
                }
            }
        }
    `;
    const json = await anilistQuery(gql, { perPage: limit, page });
    type AniListMedia = {
        idMal: number | null;
        title: { romaji: string; english: string | null; native: string | null };
        seasonYear: number | null;
        episodes: number | null;
        averageScore: number | null;
        genres: string[];
        coverImage: { large: string; extraLarge: string | null };
    };
    const media = (json?.data?.Page?.media ?? []) as AniListMedia[];
    return media
        .filter((m) => m.idMal !== null)
        .map<JikanAnime>((m) => ({
            mal_id: m.idMal as number,
            title: m.title.english ?? m.title.romaji,
            title_english: m.title.english,
            title_japanese: m.title.native,
            year: m.seasonYear,
            episodes: m.episodes,
            score: m.averageScore !== null ? m.averageScore / 10 : null,
            synopsis: null,
            genres: m.genres.map((name) => ({ name })),
            images: {
                jpg: {
                    image_url: m.coverImage.large,
                    large_image_url: m.coverImage.extraLarge ?? m.coverImage.large,
                },
            },
        }));
}

// Map a user-facing list slug → fetcher + label.
export const LIST_TYPES = {
    top: { label: "Top anime", eyebrow: "all-time best", fetch: (l: number, p: number) => getTopAnime(l, p) },
    trending: { label: "Trending now", eyebrow: "shifts daily", fetch: (l: number, p: number) => getTrendingAnimePage(l, p) },
    airing: { label: "Currently airing", eyebrow: "now airing", fetch: (l: number, p: number) => getTopAiring(l, p) },
    season: { label: "New this season", eyebrow: "this season", fetch: (l: number, p: number) => getSeasonNow(l, p) },
    upcoming: { label: "Upcoming next season", eyebrow: "coming soon", fetch: (l: number, p: number) => getSeasonUpcoming(l, p) },
    popular: { label: "Most popular", eyebrow: "by member count", fetch: (l: number, p: number) => getMostPopular(l, p) },
    favorite: { label: "Most favorited", eyebrow: "fan favorites", fetch: (l: number, p: number) => getMostFavorited(l, p) },
    movies: { label: "Top movies", eyebrow: "cinema", fetch: (l: number, p: number) => getTopMovies(l, p) },
} as const;

export type ListSlug = keyof typeof LIST_TYPES;

export function isListSlug(v: string | undefined): v is ListSlug {
    return !!v && v in LIST_TYPES;
}

export async function getTopCharacters(limit = 16): Promise<JikanCharacter[]> {
    return jikanList<JikanCharacter>(`/top/characters?limit=${limit}`);
}

const CARD_COLORS = [
    { from: "from-sakura", to: "to-twilight" },
    { from: "from-sky", to: "to-sunset" },
    { from: "from-lantern", to: "to-twilight" },
    { from: "from-peach", to: "to-sakura" },
    { from: "from-twilight", to: "to-sky" },
    { from: "from-sunset", to: "to-lantern" },
    { from: "from-sakura-soft", to: "to-sky" },
    { from: "from-sky", to: "to-twilight" },
    { from: "from-sakura", to: "to-sunset" },
] as const;

export const cardColor = (i: number) => CARD_COLORS[i % CARD_COLORS.length];
