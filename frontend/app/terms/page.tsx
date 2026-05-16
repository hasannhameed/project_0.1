import Link from "next/link";

export const metadata = {
    title: "Terms & Conditions · Hanabi",
    description: "The rules that govern your use of the Hanabi anime platform.",
};

const LAST_UPDATED = "May 14, 2026";

export default function Terms() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 animate-blob bg-twilight/30 blur-3xl" />
                <div className="relative mx-auto max-w-3xl">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        Legal
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                        <span className="gradient-text">Terms &amp; Conditions</span>
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
                            By accessing or using Hanabi (&ldquo;the Service&rdquo;), you agree to
                            be bound by these Terms. If you don&apos;t agree, please don&apos;t
                            use the Service. We may update these Terms; continued use after a
                            change means you accept the revised version.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">What Hanabi is</h2>
                        <p className="mt-3 leading-relaxed">
                            Hanabi is a discovery and community platform for anime fans. We
                            aggregate metadata from public sources like MyAnimeList and AniList,
                            embed trailers from YouTube, and provide editorial recommendations.{" "}
                            <strong className="text-white">
                                We do not host or stream copyrighted anime content
                            </strong>
                            ; we link to legal streaming partners where available.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Data attribution</h2>
                        <p className="mt-3 leading-relaxed">
                            Anime titles, descriptions, scores, cover art, banner images, and
                            character information are sourced from MyAnimeList and AniList. All
                            such content remains the property of its original owners. Hanabi
                            displays this data under each provider&apos;s public API terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Account &amp; conduct</h2>
                        <p className="mt-3 leading-relaxed">
                            When community features launch you may create an account. You agree
                            to:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>Provide accurate information.</li>
                            <li>Not impersonate others or misrepresent affiliation.</li>
                            <li>Not post unlawful, hateful, harassing, or harmful content.</li>
                            <li>Not scrape, reverse engineer, or attempt to bypass rate limits.</li>
                            <li>Not use the Service to distribute pirated content or links.</li>
                        </ul>
                        <p className="mt-4 leading-relaxed">
                            We may suspend or terminate accounts that violate these rules.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Intellectual property</h2>
                        <p className="mt-3 leading-relaxed">
                            The Hanabi name, logo, site design, editorial copy, and original code
                            are owned by us. You may not copy or reuse these without permission.
                            Anime cover art, character images, trailers, and synopses belong to
                            their respective rights holders.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Third-party links</h2>
                        <p className="mt-3 leading-relaxed">
                            Hanabi links to external sites (streaming platforms, social media,
                            partner stores). We are not responsible for the content, accuracy, or
                            privacy practices of those sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Disclaimer</h2>
                        <p className="mt-3 leading-relaxed">
                            The Service is provided &ldquo;as is&rdquo; without warranties of any
                            kind. We don&apos;t guarantee the Service will be uninterrupted,
                            error-free, or that the data shown is always up to date.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Limitation of liability</h2>
                        <p className="mt-3 leading-relaxed">
                            To the maximum extent permitted by law, Hanabi and its operators are
                            not liable for any indirect, incidental, or consequential damages
                            arising from your use of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Governing law</h2>
                        <p className="mt-3 leading-relaxed">
                            These Terms are governed by the laws of the jurisdiction in which the
                            Hanabi operator is established. Any disputes will be resolved in the
                            competent courts of that jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Contact</h2>
                        <p className="mt-3 leading-relaxed">
                            Questions about these Terms? Email{" "}
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
