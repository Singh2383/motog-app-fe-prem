import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tips and Advice | Moto G",
  description: "Smart buying and selling tips for vehicles on Moto G.",
};

export default function TipsAndAdvicePage() {
  return (
    <div className="container max-w-5/6 mt-28 mx-auto py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          Buyer’s & Seller’s Tips
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Make smarter decisions on MotoG with these practical tips.
        </p>

        {/* BUYER'S SECTION */}
        <h2 className="text-2xl font-semibold mb-4">
          🚗 BUYER&apos;S TIPS — How to Make a Smart Purchase on MotoG
        </h2>

        <Separator className="my-8" />

        {/* Section 1 */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">1. Do Your Research</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use MotoG’s filters to compare models by year, price, fuel type, and ownership.</li>
            <li>Read user reviews for insights on fuel economy, reliability, and resale value.</li>
            <li>Compare long-term maintenance costs for better budgeting.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Make a checklist of “must-haves” and stick to it.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">2. Inspect the Car Thoroughly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Inspect in daylight to notice dents, paint mismatches, or signs of damage.</li>
            <li>Check for oil leaks, battery wear, and tyre condition.</li>
            <li>Look for uneven tyre wear as a sign of suspension issues.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Test all electronics and indicators to verify working condition.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">3. Check Vehicle Documents</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Match RC with seller’s identity.</li>
            <li>Ask for comprehensive, valid insurance.</li>
            <li>Ensure PUC is up to date and collect service history.</li>
            <li>For financed cars, request NOC or loan closure letter.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Check claim history via insurers or reports.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">4. Ask for a Test Drive</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Test in both low and high traffic scenarios.</li>
            <li>Watch for strange sounds or jerky gear shifts.</li>
            <li>Test clutch, brake, and suspension performance.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Do a cold engine start to detect hidden issues.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">5. Verify the Odometer Reading</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Low mileage on older cars can be suspicious—ask for proof.</li>
            <li>Wear on pedals and steering should match the mileage.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Cross-check mileage with service record dates.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">6. Negotiate Smartly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Note flaws and estimate repair cost to support your offer.</li>
            <li>Compare similar listings for pricing justification.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> If price won’t drop, ask for free accessories.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">7. Use a Secure Payment Method</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use UPI, NEFT, or bank transfer for traceability.</li>
            <li>Ensure Form 29, 30, and delivery note are complete before payment.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Use MotoG’s secure locker (if available) for uploads.</p>
        </section>

        {/* SELLER'S SECTION */}
        <Separator className="my-8" />
        <h2 className="text-2xl font-semibold mb-4">🚙 SELLER&apos;S TIPS — How to Sell Safely & Smartly on MotoG</h2>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">1. List Your Car Honestly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Disclose accident history and modifications.</li>
            <li>Provide full vehicle details: model, fuel type, ownership, etc.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Transparency earns serious buyers and better offers.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">2. Set a Realistic Price</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Compare MotoG, OLX, and CarWale listings.</li>
            <li>Account for condition, mileage, urgency to sell, and competition.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Use MotoG’s pricing suggestion tool if unsure.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">3. Keep Your Documents Ready</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Have RC, insurance, PUC, and service history organized.</li>
            <li>Get a NOC if the car had a loan.</li>
            <li>Download and print Form 29 & 30 for handover.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Neat paperwork builds buyer confidence.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">4. Clean and Prepare Your Car</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Wash, vacuum, and polish exterior and interior.</li>
            <li>Remove personal items and make it showroom ready.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> A ₹500 cleanup can raise price by ₹5,000 or more.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">5. Respond Quickly to Inquiries</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enable notifications and be polite and prompt in replies.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Fast response = more deals closed.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">6. Meet in a Safe Location</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meet in public spaces with security (malls, fuel stations).</li>
            <li>Never let the buyer test drive without ID and supervision.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Carry only photocopies—not originals—for preview.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">7. Use MotoG for Secure Deals</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All communications are tracked and flaggable for safety.</li>
            <li>No middlemen or commissions—deal directly.</li>
          </ul>
          <p>✅ <strong>Pro Tip:</strong> Use MotoG’s checklist tool (if available) for smooth handover.</p>
        </section>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border w-full", className)} />;
}
