import { NextRequest } from "next/server";

const BASE = "https://api.jikan.moe/v4";

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const search = req.nextUrl.search;
    const url = `${BASE}/${path.join("/")}${search}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    const body = await res.text();

    return new Response(body, {
        status: res.status,
        headers: {
            "Content-Type": res.headers.get("Content-Type") ?? "application/json",
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        },
    });
}
