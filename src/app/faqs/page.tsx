import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Moto G",
  description: "Frequently Asked Questions about Moto G services and listings.",
};

export default function FaqPage() {
  return (
    <div className="container max-w-5/6 mt-28 mx-auto py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-center text-muted-foreground mb-8">
          Find answers to common questions about using Moto G.
        </p>

        {/* Q1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Do I need to sign up to list a vehicle or use MotoG’s features?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Yes, you’ll need to create an account to post a listing or access some features.</li>
            <li>Ensure your information is accurate and keep your login secure.</li>
            <li>Any activity under your account is your responsibility.</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Does MotoG handle the deal between buyers and sellers?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No — we connect buyers and sellers, but the transaction is your responsibility.</li>
            <li>MotoG does not guarantee the vehicle condition, listing accuracy, or legal paperwork.</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Who makes sure everything checks out before buying or selling?
          </h2>
          <p>Both buyers and sellers are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Double-checking the vehicle information</li>
            <li>Completing the transaction</li>
            <li>Handling all legal paperwork like RC transfer</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What payment methods are accepted when buying listing plans?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>UPI (GooglePay, Paytm, PhonePe, etc.)</li>
            <li>Net Banking</li>
            <li>Debit and Credit Cards</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What payment methods are accepted when buying a vehicle?
          </h2>
          <p>Payment methods are agreed upon between buyer and seller. MotoG does not handle payments directly.</p>
        </section>

        <Separator className="my-8" />

        {/* Q6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How do I list my car or bike for sale on MotoG?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Go to your dashboard</li>
            <li>Click “Add Listing”</li>
            <li>Upload vehicle photos</li>
            <li>Fill in the vehicle details</li>
            <li>Click “List”</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Is there a listing fee?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>FREE LISTING for up to 3 vehicles per year</li>
            <li>Monthly plans for more than 4 listings</li>
            <li>
              <a href="/plans" className="text-primary underline">Click here to check out our plans and benefits</a>
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q8 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How long does my listing stay active?</h2>
          <p>Listings remain active until the vehicle is sold. No expiration date.</p>
        </section>

        <Separator className="my-8" />

        {/* Q9 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What documents are needed to list a vehicle?</h2>
          <p>Vehicle Registration Number is required.</p>
        </section>

        <Separator className="my-8" />

        {/* Q10 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Does MotoG help with RC (Registration Certificate) transfer?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Currently not available (coming soon)</li>
            <li>Buyer and seller must handle transfer themselves</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q11 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Can I cancel a subscription?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Yes — cancel from account settings</li>
            <li>Cancellation applies at end of billing cycle</li>
            <li>No partial refunds for unused time</li>
            <li>
              <a href="/refund-policy" className="text-primary underline">Click here to read the Refund Policy</a>
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q12 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is the refund policy for listing plans?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Duplicate payment due to technical error</li>
            <li>Service not delivered (e.g., listing not activated)</li>
          </ul>
          <p>Contact us at <a href="mailto:customersupport@motog.com">customersupport@motog.com</a> within 7 days of payment.</p>
        </section>

        <Separator className="my-8" />

        {/* Q13 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What are the non-refundable items?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Live listings</li>
            <li>Partially used services</li>
            <li>User errors (wrong package, etc.)</li>
            <li>Disputes between buyer and seller (MotoG is not a party)</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q14 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Can I edit or delete my listing?</h2>
          <p>Yes — at any time. No charges for edits or deletions.</p>
        </section>

        <Separator className="my-8" />

        {/* Q15 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How long does it take to make a refund?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>5–10 business days</li>
            <li>Refunds go to original payment method</li>
            <li>Email confirmation will be sent once processed</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q16 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Are the vehicle listings verified on MotoG?</h2>
          <p>Yes — standard checks are performed to ensure listing authenticity and reduce scams.</p>
        </section>

        <Separator className="my-8" />

        {/* Q17 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What tools are available for buyers and sellers on MotoG?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Simple listing tools for cars and bikes</li>
            <li>Advanced filters for make, model, price, and location</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Q18 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Does MotoG offer any community support?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Support for new and experienced users</li>
            <li>User forums coming soon</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border w-full", className)} />;
}
