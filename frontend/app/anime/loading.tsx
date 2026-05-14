export default function Loading() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-twilight/30 blur-3xl" />
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div className="w-full max-w-xl">
                            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                            <div className="mt-3 h-14 w-3/4 animate-pulse rounded bg-white/10 sm:h-20" />
                            <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/5" />
                        </div>
                        <div className="h-12 w-full max-w-md animate-pulse rounded-full bg-white/5" />
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-7 w-20 animate-pulse rounded-full bg-white/5"
                                style={{ animationDelay: `${i * 40}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[3/4] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]"
                            style={{ animationDelay: `${i * 60}ms` }}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
