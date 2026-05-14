export default function Loading() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 animate-blob bg-sky/30 blur-3xl" />
                <div className="relative mx-auto max-w-7xl text-center">
                    <div className="mx-auto h-3 w-24 animate-pulse rounded bg-white/10" />
                    <div className="mx-auto mt-3 h-14 w-2/3 animate-pulse rounded bg-white/10 sm:h-20" />
                    <div className="mx-auto mt-3 h-4 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                            style={{ animationDelay: `${i * 70}ms` }}
                        >
                            <div className="mx-auto h-32 w-32 rounded-full bg-white/10" />
                            <div className="mx-auto mt-4 h-4 w-2/3 rounded bg-white/10" />
                            <div className="mx-auto mt-2 h-3 w-1/3 rounded bg-white/5" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
