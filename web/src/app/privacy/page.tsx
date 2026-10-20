import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Privacy notice" };

// Plain-language draft written for India's Digital Personal Data Protection Act, 2023.
// The founders should review it (and ideally have it checked) before public launch.
export default function PrivacyPage() {
  return (
    <Prose title="Privacy notice" updated="20 October 2026">
      <p>
        This notice explains what personal data {brand.name} (&ldquo;we&rdquo;) collects through this website, why, and the choices you have. We are a pre-launch business based in {brand.city}.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Waitlist:</strong> your email address and which page you signed up on.</li>
        <li><strong>Trade enquiries:</strong> your business name and type, city, optional GSTIN, your name, email, optional phone number, your interests, estimated volumes and your message.</li>
        <li><strong>Contact form:</strong> your name, email and message.</li>
      </ul>
      <p>We only collect what you type into these forms, with your consent. We do not buy contact lists.</p>
      <h2>Why we use it</h2>
      <ul>
        <li>To email you when we launch (waitlist).</li>
        <li>To reply to your enquiry or message, and to follow up about samples and supply if you asked us to.</li>
      </ul>
      <p>We do not sell your data or use it for anything else.</p>
      <h2>Where it is stored and for how long</h2>
      <p>
        Form submissions are stored securely with our database provider. We keep waitlist emails until launch plus 12 months, and enquiries for as long as we&rsquo;re in conversation and for up to 24 months afterwards, unless you ask us to delete them sooner.
      </p>
      <h2>Your rights</h2>
      <p>
        You can withdraw consent, ask to see the data we hold about you, ask us to correct it, or ask us to delete it at any time. Every launch email will include an unsubscribe link. To make a request, use the contact page and we will respond within 30 days.
      </p>
      <h2>Contact</h2>
      <p>
        For any privacy question or complaint, reach us through the <a href="/contact">contact page</a>.
      </p>
    </Prose>
  );
}
