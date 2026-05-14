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

async function jikan<T>(path: string, revalidate = 3600): Promise<T> {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate } });
    if (!res.ok) throw new Error(`Jikan ${path} → ${res.status}`);
    return res.json();
}

export async function getTopAnime(limit = 24): Promise<JikanAnime[]> {
    const { data } = await jikan<Page<JikanAnime>>(`/top/anime?limit=${limit}`);
    return data;
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

export async function searchAnime(query: string, limit = 24): Promise<JikanAnime[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const params = new URLSearchParams({
        q: trimmed,
        limit: String(limit),
        order_by: "score",
        sort: "desc",
        sfw: "true",
    });
    const { data } = await jikan<Page<JikanAnime>>(`/anime?${params.toString()}`, 600);
    return data;
}

export async function getAnimeByGenre(
    slug: GenreSlug,
    limit = 24,
): Promise<JikanAnime[]> {
    const filter = GENRE_FILTERS.find((f) => f.slug === slug) ?? GENRE_FILTERS[0];
    if (filter.id === null) return getTopAnime(limit);

    const params = new URLSearchParams({
        genres: String(filter.id),
        order_by: "score",
        sort: "desc",
        limit: String(limit),
        min_score: "7",
        sfw: "true",
    });
    const { data } = await jikan<Page<JikanAnime>>(`/anime?${params.toString()}`);
    return data;
}

export async function getSeasonNow(limit = 12): Promise<JikanAnime[]> {
    const { data } = await jikan<Page<JikanAnime>>(`/seasons/now?limit=${limit}`);
    return data;
}

export async function getTopCharacters(limit = 16): Promise<JikanCharacter[]> {
    const { data } = await jikan<Page<JikanCharacter>>(`/top/characters?limit=${limit}`);
    return data;
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
