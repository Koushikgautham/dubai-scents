import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with us." };

export default function ContactPage() {
  const wa = brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : null;
  return (
    <>
      <PageIntro label="Contact" title="Say hello." italic={[1]} intro="Questions about the collection, the Oil Library or working with us? Write to us." />
      <section aria-label="Contact details and form" className="bg-night pb-32">
        <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8 text-dune">
            <div>
              <p className="label text-gold">Based in</p>
              <p className="mt-2 text-sand">{brand.city}</p>
            </div>
            {!brand.email.endsWith("example.com") ? (
              <div>
                <p className="label text-gold">Email</p>
                <a className="mt-2 block text-sand underline-offset-4 hover:underline" href={`mailto:${brand.email}`}>{brand.email}</a>
              </div>
            ) : null}
            {wa ? (
              <div>
                <p className="label text-gold">WhatsApp</p>
                <a className="mt-2 block text-sand underline-offset-4 hover:underline" href={wa} target="_blank" rel="noopener noreferrer">Chat with us</a>
              </div>
            ) : null}
            <div>
              <p className="label text-gold">For businesses</p>
              <a className="mt-2 block text-sand underline-offset-4 hover:underline" href="/business#enquiry">Send a trade enquiry →</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
