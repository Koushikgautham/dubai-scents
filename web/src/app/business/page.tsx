import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { TradeEnquiryForm } from "@/components/forms/TradeEnquiryForm";

export const metadata: Metadata = {
  title: "For Business",
  description: "Alcohol-free perfume oils in bulk for Indian brands and attar shops, with SDS, IFRA and COA documents. Trade enquiries open.",
};

const supply = [
  { t: "Bulk perfume oils", d: "Alcohol-free oils in 500 g and 1 kg bottles, repacked under our brand in India." },
  { t: "Documents with every batch", d: "Safety data sheet, IFRA certificate of conformity and a certificate of analysis, so you can check and file with confidence." },
  { t: "Consistent batches", d: "We'll keep a retained sample of every batch and check each delivery against the approved standard." },
];

const steps = [
  { n: "01", t: "Enquire", d: "Tell us what you make and the profiles you're looking for." },
  { n: "02", t: "Evaluate", d: "Sample kits for trade partners from January 2027." },
  { n: "03", t: "Order", d: "Supply starts once our import registration is approved, expected mid-2027." },
];

const terms = [
  ["Minimum order", "500 g per scent"],
  ["First orders", "Advance payment for the first three orders"],
  ["Sample kit", "Paid, and credited against your first order"],
  ["Documents", "SDS, IFRA certificate and COA with each batch"],
];

export default function BusinessPage() {
  return (
    <>
      <PageIntro
        label="For business"
        title="Perfume oils for your brand."
        italic={[3]}
        intro="We're setting up to supply Indian perfume and attar brands with alcohol-free oils from UAE manufacturers, fully documented and consistent from batch to batch."
      />

      <section aria-labelledby="supply-heading" className="bg-night pb-28">
        <div className="wrap">
          <h2 id="supply-heading" className="sr-only">What we supply</h2>
          <Reveal stagger className="grid gap-5 md:grid-cols-3">
            {supply.map((s) => (
              <div key={s.t} data-reveal-item="" className="rounded-[22px] border border-gold/20 bg-gradient-to-b from-umber to-night p-7">
                <h3 className="display text-[30px] text-sand">{s.t}</h3>
                <p className="mt-3 text-[15px] text-smoke">{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="border-t border-gold/10 bg-night py-28">
        <div className="wrap grid gap-16 md:grid-cols-2">
          <div>
            <p className="label text-gold">How it works</p>
            <SplitText as="h2" id="how-heading" text="From enquiry to first order." className="display mt-4 text-[clamp(40px,5vw,72px)] text-sand" />
            <Reveal stagger className="mt-10 space-y-8">
              {steps.map((s) => (
                <div key={s.n} data-reveal-item="" className="flex gap-6 border-l border-gold/30 pl-6">
                  <span className="label pt-2 text-gold">{s.n}</span>
                  <div>
                    <h3 className="display text-[30px] text-sand">{s.t}</h3>
                    <p className="mt-1 text-smoke">{s.d}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          <div>
            <p className="label text-gold">Working terms</p>
            <Reveal className="mt-6">
              <dl className="divide-y divide-gold/15 border-y border-gold/15">
                {terms.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 py-5">
                    <dt className="text-dune">{k}</dt>
                    <dd className="text-sand">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-smoke">Prices are shared on request once our range is final. We describe scents by their profile and do not supply oils named after other brands.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-heading" data-header-theme="light" className="on-light scroll-mt-20 bg-sand py-28 text-ink md:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="label text-amber">Trade enquiry</p>
            <SplitText as="h2" id="enquiry-heading" text="Tell us about your business." className="display mt-4 text-[clamp(40px,5vw,72px)]" />
            <p className="mt-6 max-w-[40ch] text-smoke">We reply within two working days. You can also request a sample kit for when they&rsquo;re ready in January 2027.</p>
          </div>
          <TradeEnquiryForm />
        </div>
      </section>
    </>
  );
}
