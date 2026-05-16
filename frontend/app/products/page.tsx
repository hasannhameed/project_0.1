import Link from "next/link";

export const metadata = {
    title: "Products · Hanabi",
    description: "Curated affiliate products — fetched live from our supplier API.",
};

export const revalidate = 3600;

type ApiProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
};

async function getProducts(): Promise<ApiProduct[]> {
    const res = await fetch("https://fakestoreapi.com/products", {
        next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
}

// Capitalize "men's clothing" → "Men's Clothing"
function prettyCategory(c: string) {
    return c
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
}

// Convert "Men's Clothing" → "men's clothing" so it matches the API value
function slugifyCategory(c: string) {
    return c.toLowerCase();
}

export default async function Products({
    searchParams,
}: {
    searchParams: Promise<{ c?: string }>;
}) {
    const { c } = await searchParams;
    const products = await getProducts();

    // Build the unique category list from whatever the API returned, so we
    // never show a category that has zero items behind it.
    const categorySet = new Set(products.map((p) => p.category));
    const categories = ["All", ...Array.from(categorySet).sort()];

    const activeRaw = c?.toLowerCase().trim();
    const active = activeRaw && categorySet.has(activeRaw) ? activeRaw : "all";
    const filtered =
        active === "all" ? products : products.filter((p) => p.category === active);

    return (
        <main>
            {/* HERO */}
            <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-sakura/25 blur-3xl" />
                <div className="relative mx-auto max-w-5xl">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                        Shop
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-7xl [animation-delay:0.1s]">
                        <span className="gradient-text">Curated products.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl animate-rise text-base text-white/70 sm:text-lg [animation-delay:0.2s]">
                        Hand-picked from our supplier catalog. Every link is an affiliate link — buying through us costs nothing extra and helps keep Hanabi running.{" "}
                        <Link href="/affiliate-disclosure" className="text-sakura underline hover:text-white">
                            Read our disclosure
                        </Link>.
                    </p>

                    {/* Category filters */}
                    <div className="mt-8 flex animate-rise flex-wrap gap-2 [animation-delay:0.3s]">
                        {categories.map((cat) => {
                            const slug = cat === "All" ? "all" : slugifyCategory(cat);
                            const isActive = slug === active;
                            const href = cat === "All" ? "/products" : `/products?c=${encodeURIComponent(slug)}`;
                            return (
                                <Link
                                    key={cat}
                                    href={href}
                                    scroll={false}
                                    className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:scale-105 ${isActive
                                        ? "border-transparent bg-gradient-to-r from-sakura via-twilight to-sky text-white shadow-lg shadow-sakura/30"
                                        : "border-white/10 bg-white/5 text-white/70 hover:border-sakura/40 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {prettyCategory(cat)}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* GRID */}
            <section className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-8">
                {filtered.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur">
                        <p className="font-display text-2xl text-white">
                            No products found.
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                            {products.length === 0
                                ? "The catalog API didn't respond. Refresh in a moment."
                                : "Try a different category or browse all."}
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105"
                        >
                            See all products →
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((p, i) => (
                            <article
                                key={p.id}
                                className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition hover:-translate-y-1.5 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/20"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <Link
                                    href="/join"
                                    className="block"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-white/95 p-6">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            loading="lazy"
                                            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                                            {prettyCategory(p.category)}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-display text-base text-white line-clamp-2 transition group-hover:text-sakura-soft">
                                            {p.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-white/50 line-clamp-2">
                                            {p.description}
                                        </p>
                                        <div className="mt-3 flex items-baseline gap-2">
                                            <span className="font-display text-xl text-white">
                                                ${p.price.toFixed(2)}
                                            </span>
                                            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-sakura">
                                                ★ {p.rating.rate.toFixed(1)}
                                                <span className="ml-1 text-white/40">
                                                    ({p.rating.count})
                                                </span>
                                            </span>
                                        </div>
                                        <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/20 transition group-hover:shadow-sakura/40">
                                            Shop now
                                            <span className="transition group-hover:translate-x-0.5">↗</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* DISCLOSURE STRIP */}
            <section className="mx-auto max-w-4xl px-6 pb-24 text-center sm:px-8">
                <div className="glass rounded-3xl p-6 text-sm text-white/60">
                    <p>
                        <strong className="text-white">Affiliate disclosure:</strong> we earn a small commission on qualifying purchases at no extra cost to you.{" "}
                        <Link href="/affiliate-disclosure" className="text-sakura underline hover:text-white">
                            Full disclosure →
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
