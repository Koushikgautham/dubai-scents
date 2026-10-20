import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Prose title="Terms" updated="20 October 2026">
      <p>
        {brand.name} is preparing to launch. These terms cover your use of this website during the pre-launch period.
      </p>
      <h2>Nothing is on sale yet</h2>
      <p>
        Products shown on this site are not yet available to buy. Descriptions, names, notes and visuals are previews and may change before launch. Bottle visuals are design concepts, not photographs of the final product.
      </p>
      <h2>Enquiries are not orders</h2>
      <p>
        Submitting a trade enquiry or joining the waitlist does not create an order or any obligation for you or for us. Supply will begin only after we hold the required Indian registrations and licences.
      </p>
      <h2>Content</h2>
      <p>
        The text, design and visuals on this site belong to us or are used under licence. Please don&rsquo;t reuse them without permission.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Use the <a href="/contact">contact page</a>.
      </p>
    </Prose>
  );
}
