const ENDPOINT = "https://graphql.anilist.co";

export type AnilistCharacter = {
    role: string;
    node: {
        id: number;
        name: { full: string };
        image: { large: string | null };
    };
    voiceActors: {
        name: { full: string };
        image: { medium: string | null };
    }[];
};

export type AnilistRecommendation = {
    id: number;
    idMal: number | null;
    title: { romaji: string; english: string | null };
    coverImage: { large: string };
    averageScore: number | null;
};

export type AnilistRelation = {
    relationType: string;
    node: {
        id: number;
        idMal: number | null;
        type: "ANIME" | "MANGA";
        title: { romaji: string; english: string | null };
        coverImage: { large: string };
        format: string | null;
    };
};

export type AnilistExternalLink = {
    url: string;
    site: string;
    color: string | null;
};

export type AnilistAnime = {
    id: number;
    idMal: number | null;
    title: { romaji: string; english: string | null; native: string | null };
    description: string | null;
    episodes: number | null;
    duration: number | null;
    status: string | null;
    season: string | null;
    seasonYear: number | null;
    format: string | null;
    averageScore: number | null;
    meanScore: number | null;
    popularity: number;
    favourites: number;
    genres: string[];
    coverImage: { extraLarge: string; large: string; color: string | null };
    bannerImage: string | null;
    trailer: { id: string; site: string; thumbnail: string | null } | null;
    nextAiringEpisode: { episode: number; timeUntilAiring: number; airingAt: number } | null;
    studios: { nodes: { name: string }[] };
    characters: { edges: AnilistCharacter[] };
    recommendations: { nodes: { mediaRecommendation: AnilistRecommendation | null }[] };
    relations: { edges: AnilistRelation[] };
    externalLinks: AnilistExternalLink[];
};

async function graphql<T>(query: string, variables: Record<string, unknown>, revalidate = 3600): Promise<T> {
    const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate },
    });
    if (!res.ok) throw new Error(`AniList ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(`AniList: ${json.errors[0]?.message ?? "unknown"}`);
    return json.data as T;
}

const ANIME_DETAIL = `
query AnimeByMal($malId: Int!) {
    Media(idMal: $malId, type: ANIME) {
        id
        idMal
        title { romaji english native }
        description(asHtml: false)
        episodes
        duration
        status
        season
        seasonYear
        format
        averageScore
        meanScore
        popularity
        favourites
        genres
        coverImage { extraLarge large color }
        bannerImage
        trailer { id site thumbnail }
        nextAiringEpisode { episode timeUntilAiring airingAt }
        studios(isMain: true) { nodes { name } }
        characters(perPage: 8, sort: ROLE) {
            edges {
                role
                node { id name { full } image { large } }
                voiceActors(language: JAPANESE, sort: RELEVANCE) {
                    name { full }
                    image { medium }
                }
            }
        }
        recommendations(perPage: 8, sort: RATING_DESC) {
            nodes {
                mediaRecommendation {
                    id idMal
                    title { romaji english }
                    coverImage { large }
                    averageScore
                }
            }
        }
        relations {
            edges {
                relationType(version: 2)
                node {
                    id idMal type
                    title { romaji english }
                    coverImage { large }
                    format
                }
            }
        }
        externalLinks { url site color }
    }
}`;

export async function getAnimeByMalId(malId: number): Promise<AnilistAnime | null> {
    const data = await graphql<{ Media: AnilistAnime | null }>(ANIME_DETAIL, { malId });
    return data.Media;
}

export function stripHtml(s: string | null) {
    if (!s) return "";
    return s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
}

export function formatStatus(status: string | null) {
    if (!status) return "Unknown";
    return status
        .toLowerCase()
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
}

export function relationLabel(type: string) {
    const map: Record<string, string> = {
        SEQUEL: "Sequel",
        PREQUEL: "Prequel",
        SIDE_STORY: "Side Story",
        PARENT: "Parent",
        ADAPTATION: "Adaptation",
        SOURCE: "Source",
        ALTERNATIVE: "Alternative",
        SPIN_OFF: "Spin-off",
        OTHER: "Related",
        CHARACTER: "Shared Character",
        SUMMARY: "Summary",
    };
    return map[type] ?? type;
}
