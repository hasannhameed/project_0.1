const API = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!API && typeof window !== "undefined") {
    console.warn("NEXT_PUBLIC_API_URL is not set. Auth calls will fail.");
}

export type AuthUser = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
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
