import Link from "next/link";

export const metadata = {
    title: "Affiliate Disclosure · Hanabi",
    description: "How Hanabi uses affiliate links and how it affects our editorial choices.",
};

const LAST_UPDATED = "May 14, 2026";

export default function AffiliateDisclosure() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 animate-blob bg-sunset/25 blur-3xl" />
                <div className="relative mx-auto max-w-3xl">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sunset">
                        Legal
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                        <span className="gradient-text">Affiliate Disclosure</span>
                    </h1>
                    <p className="mt-3 animate-rise text-sm text-white/50 [animation-delay:0.2s]">
                        Last updated: {LAST_UPDATED}
                    </p>
                </div>
            </section>

            <article className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
                <div className="prose-legal space-y-10 text-white/75">
                    <section>
                        <p className="leading-relaxed">
                            Transparency matters to us. Some links on Hanabi are{" "}
                            <strong className="text-white">affiliate links</strong>: when you
                            click one and make a purchase or sign up for a paid service, we may
                            earn a small commission at no extra cost to you. This page explains
                            how it works and why we&apos;ve set things up this way.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">What is an affiliate link?</h2>
                        <p className="mt-3 leading-relaxed">
                            An affiliate link is a special URL that includes a tracking code
                            unique to us. If you buy or subscribe via that link, the partner
                            company pays us a commission &mdash; usually a small percentage of
                            your purchase. The price you pay stays exactly the same.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Where we use them</h2>
                        <p className="mt-3 leading-relaxed">
                            Affiliate links may appear in:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>
                                Streaming-platform &ldquo;Watch on Crunchyroll / Netflix / Hulu / Hidive&rdquo;
                                buttons on anime detail pages.
                            </li>
                            <li>
                                Merchandise links to partner stores when we mention figures, art
                                books, or apparel.
                            </li>
                            <li>
                                Newsletter recommendations and editorial roundups.
                            </li>
                        </ul>
                        <p className="mt-4 leading-relaxed">
                            We do <strong className="text-white">not</strong> use affiliate links
                            for the data shown on the site (titles, scores, synopses, characters) &mdash;
                            those are sourced from public APIs and remain free of commercial
                            influence.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Editorial independence</h2>
                        <p className="mt-3 leading-relaxed">
                            An affiliate relationship never determines whether an anime is
                            featured, recommended, or how it&apos;s ranked. Our rankings come from
                            MyAnimeList&apos;s community scores or our own editorial picks, not
                            from which partners pay us. If you see &ldquo;Watch on X&rdquo; on a
                            detail page, it&apos;s because X actually streams the show &mdash; we
                            won&apos;t link you to a service that doesn&apos;t carry it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">No extra cost to you</h2>
                        <p className="mt-3 leading-relaxed">
                            Whether you reach Crunchyroll (or any other partner) through our link
                            or directly, you pay the same price. The commission comes out of the
                            partner&apos;s marketing budget, not your wallet.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">How to identify affiliate links</h2>
                        <p className="mt-3 leading-relaxed">
                            Affiliate links typically open in a new tab and may pass through a
                            short redirect URL. If you&apos;d rather not use them, you can visit
                            the partner&apos;s site directly &mdash; the recommendation stands
                            either way.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">FTC compliance</h2>
                        <p className="mt-3 leading-relaxed">
                            This disclosure is published in line with the U.S. Federal Trade
                            Commission&apos;s Endorsement Guides and the equivalent regulations in
                            other jurisdictions. We believe in over-disclosing, so if any link on
                            the site is affiliate-monetized, this page covers it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Questions</h2>
                        <p className="mt-3 leading-relaxed">
                            Want to know more about a specific partnership, or have feedback?
                            Email{" "}
                            <a href="mailto:hello@hanabi.app" className="text-sakura underline">
                                hello@hanabi.app
                            </a>{" "}
                            or reach us through the{" "}
                            <Link href="/contact" className="text-sakura underline">
                                contact page
                            </Link>.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
