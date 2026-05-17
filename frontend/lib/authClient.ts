const API = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!API && typeof window !== "undefined") {
    console.warn("NEXT_PUBLIC_API_URL is not set. Auth calls will fail.");
}

export type AuthUser = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
};

export type CommentAuthor = {
    id: number;
    name: string;
    avatar: string | null;
};

export type CommentRecord = {
    id: number;
    animeMalId: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: CommentAuthor | null;
};

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API}${path}`, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(init.headers ?? {}),
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data?.error ?? `Request failed (${res.status})`);
    }
    return data as T;
}

// ── Auth ──────────────────────────────────────────────────────────────
export function signup(input: { name: string; email: string; password: string }) {
    return call<{ user: AuthUser }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export function login(input: { email: string; password: string }) {
    return call<{ user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export function logout() {
    return call<{ ok: true }>("/api/auth/logout", { method: "POST" });
}

export function me() {
    return call<{ user: AuthUser }>("/api/auth/me", { method: "GET" });
}

export function updateProfile(input: {
    name?: string;
    bio?: string | null;
    avatar?: string | null;
}) {
    return call<{ user: AuthUser }>("/api/auth/me", {
        method: "PUT",
        body: JSON.stringify(input),
    });
}

// ── Comments ──────────────────────────────────────────────────────────
export function getCommentsForAnime(malId: number) {
    return call<{ comments: CommentRecord[] }>(`/api/comments/anime/${malId}`);
}

export function getMyComments() {
    return call<{ comments: CommentRecord[] }>(`/api/comments/mine`);
}

export function postComment(input: { animeMalId: number; body: string }) {
    return call<{ comment: CommentRecord }>(`/api/comments`, {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export function deleteComment(id: number) {
    return call<{ ok: true }>(`/api/comments/${id}`, { method: "DELETE" });
}

// ── Likes ─────────────────────────────────────────────────────────────
export function getLikeForAnime(malId: number) {
    return call<{ count: number; liked: boolean }>(`/api/likes/anime/${malId}`);
}

export function toggleLike(malId: number) {
    return call<{ count: number; liked: boolean }>(`/api/likes/${malId}`, {
        method: "POST",
    });
}

export function getMyLikes() {
    return call<{ likes: { animeMalId: number; likedAt: string }[] }>(
        `/api/likes/mine`,
    );
}
