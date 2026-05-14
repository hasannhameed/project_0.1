export default function Loading() {
    return (
        <main>
            <section className="relative">
                <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden animate-pulse bg-white/[0.03]" />
                <div className="relative mx-auto -mt-72 max-w-7xl px-6 sm:-mt-80 sm:px-8">
                    <div className="grid gap-8 sm:gap-10 md:grid-cols-[260px_1fr] md:gap-12">
                        <div className="mx-auto aspect-[2/3] w-56 animate-pulse rounded-3xl border border-white/10 bg-white/[0.05] sm:w-64 md:mx-0" />
                        <div className="flex flex-col gap-4">
                            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                            <div className="h-12 w-3/4 animate-pulse rounded bg-white/10 sm:h-16" />
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
                                ))}
                            </div>
                            <div className="mt-4 h-10 w-48 animate-pulse rounded-full bg-white/10" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                <div className="mt-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
                </div>
            </section>
        </main>
    );
}
