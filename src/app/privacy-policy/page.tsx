import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Moto G",
    description: "Privacy Policy for Moto G website",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container max-w-5/6 mt-28 mx-auto py-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                    Privacy Policy
                </h1>
                <p className="text-center text-muted-foreground mb-8">
                    Effective Date: July 7, 2025
                </p>

                <section className="mb-8">
                    <p>
                        Moto G operates the website{" "}
                        <a
                            href="https://www.gomotog.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.gomotog.com
                        </a>
                        . This Privacy Policy explains how we collect, use, disclose, and
                        safeguard your information when you visit our Site. Please read this
                        policy carefully. If you do not agree with it, please do not access
                        the Site.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

                    <h3 className="font-medium">a. Personal Data</h3>
                    <p>
                        Personally identifiable information, such as your name, email
                        address, mailing address, and phone number, which you voluntarily
                        give to us when you register on the Site, subscribe to a newsletter,
                        or otherwise contact us.
                    </p>

                    <h3 className="font-medium">b. Derivative Data</h3>
                    <p>
                        Information our servers automatically collect when you access the
                        Site, such as your IP address, browser type, operating system,
                        access times, and pages viewed directly before and after accessing
                        the Site.
                    </p>

                    <h3 className="font-medium">c. Cookies and Tracking Technologies</h3>
                    <p>
                        We may use cookies, web beacons, and other tracking technologies to
                        help customize the Site and improve your experience.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Use of Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Operate and maintain the Site</li>
                        <li>Improve your experience with our services</li>
                        <li>Send you administrative and promotional communications</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze usage and trends</li>
                    </ul>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Disclosure of Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Service Providers:</strong> We may share your information
                            with third-party vendors, service providers, contractors, or
                            agents who perform services for us or on our behalf.
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> We may disclose your
                            information where required to do so by law or in response to valid
                            legal requests.
                        </li>
                    </ul>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                    <p>
                        We use administrative, technical, and physical security measures to
                        help protect your personal information. While we strive to use
                        commercially acceptable means to protect your information, we cannot
                        guarantee its absolute security.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Your Data Protection Rights</h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Access the personal information we hold about you</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Object to our use of your personal data</li>
                        <li>Request data portability</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at{" "}
                        <a href="mailto:wandcorppvtltd@gmail.com">
                            wandcorppvtltd@gmail.com
                        </a>
                        .
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Third-Party Websites</h2>
                    <p>
                        The Site may contain links to third-party websites. We are not
                        responsible for the privacy practices or the content of third-party
                        websites.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                    <p>
                        We reserve the right to make changes to this Privacy Policy at any
                        time and for any reason. We will notify you about any changes by
                        updating the “Effective Date” of this policy. Continued use of the
                        Site after such changes will constitute your acknowledgment and
                        agreement to the updated policy.
                    </p>
                </section>
            </div>
        </div>
    );
}

function Separator({ className }: { className?: string }) {
    return <div className={cn("h-px bg-border w-full", className)} />;
}
