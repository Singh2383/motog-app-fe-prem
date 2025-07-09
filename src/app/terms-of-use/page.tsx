import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Moto G",
  description: "Terms of Use for Moto G website",
};

export default function TermsOfUsePage() {

  return (
    <div className="container max-w-5/6 mt-28 mx-auto py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Terms of Use</h1>
        <p className="text-center text-muted-foreground mb-8">Effective Date: July 7, 2025</p>
        
        <section className="mb-8">
          <p>
            Welcome to Moto G. These Terms of Use govern your use of our website located at www.gomotog.com 
            and all related services (collectively, the &quot;Site&quot;). By accessing or using the Site, you agree to 
            be bound by these Terms. If you do not agree, please do not use the Site.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Use of the Site</h2>
          <p>
            The Site provides a platform for users to buy, sell, and browse vehicles. You may use the Site only 
            if you are at least 18 years old and capable of forming a binding contract.
          </p>
          <p>
            You agree not to use the Site for any unlawful purpose or in a way that violates these Terms.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p>
            To list a vehicle or access certain features, you may need to create an account. You agree to provide 
            accurate information and to keep your login credentials secure. You are responsible for all activity 
            under your account.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Listings and Content</h2>
          <p>
            Users may post vehicle listings, photos, and other content (&quot;User Content&quot;). By submitting content, 
            you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute it on the Site.
          </p>
          <p>You agree that:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>All information in your listings is accurate and not misleading.</li>
            <li>You own or have the right to use the content you submit.</li>
            <li>Your content does not violate any law or third-party rights.</li>
          </ul>
          <p>
            We reserve the right to remove any content that violates these Terms or is deemed inappropriate.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Buying and Selling</h2>
          <p>
            We are not a party to any transaction between buyers and sellers. We do not guarantee the quality, 
            legality, or condition of vehicles listed on the Site, nor do we guarantee the accuracy of any listing.
          </p>
          <p>
            Buyers and sellers are solely responsible for verifying information, completing transactions, and 
            complying with applicable laws and regulations, including vehicle registration and title transfers.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Fees and Payments</h2>
          <p>
            Some features or services may require payment (e.g., premium listings). All fees will be clearly 
            disclosed. You agree to pay all applicable charges and taxes. Fees are non-refundable unless 
            otherwise stated.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Post false, misleading, or fraudulent content</li>
            <li>List stolen or unsafe vehicles</li>
            <li>Use automated systems (e.g., bots, scrapers) without permission</li>
            <li>Distribute spam or unsolicited communications</li>
            <li>Harass, threaten, or defraud other users</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
          <p>
            All content on the Site (except for User Content), including text, graphics, logos, and software, 
            is owned by or licensed to us and is protected by intellectual property laws. You may not copy, 
            reproduce, or distribute Site content without permission.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p>
            We may suspend or terminate your access to the Site at any time, without notice, for conduct that 
            violates these Terms or is otherwise harmful to us, other users, or third parties.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
          <p>
            The Site is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee 
            the accuracy, completeness, or usefulness of the Site or User Content.
          </p>
          <p>
            We are not responsible for any transaction between users, nor for any damage, loss, or theft related 
            to vehicle sales.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or 
            consequential damages resulting from your use of the Site or from any transaction facilitated through 
            the Site.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India, without regard to its conflict of law principles.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. The updated version will be posted on this page with 
            the new effective date. Your continued use of the Site constitutes your acceptance of the revised Terms.
          </p>
        </section>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border w-full", className)} />;
}