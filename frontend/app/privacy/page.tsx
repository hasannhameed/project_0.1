import Link from "next/link";

export const metadata = {
    title: "Privacy Policy · Hanabi",
    description: "How Hanabi handles your data, cookies, and third-party services.",
};

const LAST_UPDATED = "May 14, 2026";

export default function Privacy() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-sakura/25 blur-3xl" />
                <div className="relative mx-auto max-w-3xl">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                        Legal
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                        <span className="gradient-text">Privacy Policy</span>
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
                            Hanabi (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an
                            anime catalog and community platform. This Privacy Policy explains
                            what information we collect, how we use it, and the choices you
                            have. By using Hanabi you agree to the practices described here.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Information we collect</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>
                                <strong className="text-white">Email address</strong> &mdash; only
                                if you sign up on our &ldquo;Coming Soon&rdquo; page or send us a
                                message through the contact form.
                            </li>
                            <li>
                                <strong className="text-white">Form messages</strong> &mdash;
                                content you submit through the contact form, used solely to reply
                                to your inquiry.
                            </li>
                            <li>
                                <strong className="text-white">Technical data</strong> &mdash; basic
                                request information (IP, browser, referrer) collected automatically
                                by our hosting provider for security and analytics aggregation.
                            </li>
                            <li>
                                <strong className="text-white">Cookies</strong> &mdash; we use
                                strictly-necessary cookies for site functionality. We do not use
                                advertising or cross-site tracking cookies.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">How we use it</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>To respond to messages you send us.</li>
                            <li>To notify you when features launch (only if you opted in).</li>
                            <li>To monitor site health, prevent abuse, and improve performance.</li>
                            <li>To comply with legal obligations when required.</li>
                        </ul>
                        <p className="mt-4 leading-relaxed">
                            We do <strong className="text-white">not</strong> sell your data, share
                            it with advertisers, or use it for cross-platform targeting.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Third-party services</h2>
                        <p className="mt-3 leading-relaxed">
                            Hanabi displays anime metadata sourced from the following public APIs.
                            When you load a page, your browser may make requests to them and they
                            may log your IP under their own privacy policies:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            <li>
                                <a href="https://myanimelist.net/about/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-sakura underline">
                                    MyAnimeList (via Jikan API)
                                </a> &mdash; anime poster images and rankings.
                            </li>
                            <li>
                                <a href="https://anilist.co/terms" target="_blank" rel="noopener noreferrer" className="text-sakura underline">
                                    AniList
                                </a> &mdash; detailed anime data, banners, and recommendations.
                            </li>
                            <li>
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sakura underline">
                                    YouTube (via youtube-nocookie.com)
                                </a> &mdash; trailer embeds. We use the privacy-enhanced domain so
                                no cookies are set unless you click play.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Your rights</h2>
                        <p className="mt-3 leading-relaxed">
                            Depending on your jurisdiction (GDPR, CCPA, etc.) you may have the
                            right to access, correct, delete, or export any personal data we hold
                            about you. To exercise these rights, email us at the address below.
                            We will respond within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Data retention</h2>
                        <p className="mt-3 leading-relaxed">
                            Email addresses and contact-form messages are kept for as long as your
                            account is active or as needed to provide you services. You can
                            request deletion at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Children&apos;s privacy</h2>
                        <p className="mt-3 leading-relaxed">
                            Hanabi is not directed to children under 13. We do not knowingly
                            collect personal information from children. If you believe a child has
                            sent us data, contact us and we&apos;ll delete it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Changes to this policy</h2>
                        <p className="mt-3 leading-relaxed">
                            We may update this policy occasionally. Material changes will be
                            announced on the site at least 14 days before taking effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-white">Contact</h2>
                        <p className="mt-3 leading-relaxed">
                            Privacy questions, data requests, or anything else? Reach us at{" "}
                            <a href="mailto:hello@hanabi.app" className="text-sakura underline">
                                hello@hanabi.app
                            </a>{" "}
                            or through the{" "}
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
