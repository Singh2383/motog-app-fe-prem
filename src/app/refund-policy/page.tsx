import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Moto G",
  description: "Moto G's refund policy for paid listings and services.",
};

export default function RefundPolicyPage() {
  return (
    <div className="container max-w-5/6 mt-28 mx-auto py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Refund Policy</h1>
        <p className="text-center text-muted-foreground mb-8">Effective Date: July 7, 2025</p>

        {/* Intro */}
        <section className="mb-8">
          <p>
            At Moto G, we strive to provide a reliable platform for users to buy and sell vehicles. Please read
            this Refund Policy carefully to understand your rights and obligations when purchasing services from
            our website <a href="https://www.gomotog.com" className="text-primary underline">www.gomotog.com</a>.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Services Eligible for Refund</h2>
          <p>We offer paid services such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Featured or premium vehicle listings</li>
            <li>Ad boosts or visibility upgrades</li>
            <li>Subscription-based tools or seller services</li>
          </ul>
          <p>Refunds may be available for these services under the conditions outlined below.</p>
        </section>

        <Separator className="my-8" />

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
          <p>We will issue refunds only under the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Duplicate Payment: You were charged more than once for the same service due to a technical error.</li>
            <li>Service Not Delivered: A paid listing or feature was not properly activated or displayed due to our fault.</li>
          </ul>
          <p>
            To request a refund, please contact us at <a href="mailto:wandcorppvtltd@gmail.com">wandcorppvtltd@gmail.com</a> within 7 days of the original payment.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Non-Refundable Items</h2>
          <p>Refunds will not be issued for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Listings that have already been published or made live</li>
            <li>Services that have been partially used or accessed</li>
            <li>User error (e.g., purchasing the wrong listing package, inputting incorrect details)</li>
            <li>Disputes between buyers and sellers over vehicle condition, price, or ownership</li>
          </ul>
          <p>
            Note: Moto G is not a party to vehicle transactions and does not offer refunds for car sales or purchases.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Processing Refunds</h2>
          <p>
            If your refund request is approved, it will be processed back to the original payment method within
            5–10 business days. You will receive an email confirmation when the refund has been issued.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Subscription Cancellations</h2>
          <p>
            If you have a recurring subscription (e.g., monthly seller tools), you may cancel it anytime from your
            account settings. Cancellation will take effect at the end of your current billing cycle. No partial
            refunds will be given for unused time.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Chargebacks and Disputes</h2>
          <p>
            Initiating a chargeback without contacting us first may result in account suspension or listing removal.
            If you believe a charge was made in error, please contact us before disputing it with your bank or card
            issuer. We’re happy to investigate and resolve the issue.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you believe you are eligible for a refund or have questions about this policy, please contact us at:
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li><strong>Moto G by Wandcorp Private Limited</strong></li>
            <li><a href="mailto:wandcorppvtltd@gmail.com" className="text-primary underline">wandcorppvtltd@gmail.com</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border w-full", className)} />;
}
