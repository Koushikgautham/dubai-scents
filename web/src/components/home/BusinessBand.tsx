import Link from "next/link";
import { Reveal, SplitText } from "@/components/motion/Reveal";

const points = [
  { n: "01", t: "Bulk oils", d: "Alcohol-free perfume oils in 500 g and 1 kg, packed under our brand." },
  { n: "02", t: "Documents with every batch", d: "Safety data sheet, IFRA certificate and certificate of analysis." },
  { n: "03", t: "Sample kits", d: "Evaluation kits for trade partners from January 2027." },
];

export function BusinessBand() {
  return (
    <section aria-labelledby="biz-heading" className="relative overflow-hidden bg-night py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_85%_10%,rgba(199,122,26,0.18),transparent_70%)]" />
      <div className="wrap relative">
        <p className="label text-gold">For business</p>
        <SplitText as="h2" id="biz-heading" text="Oils for your brand." italic={[2]} className="display mt-4 text-[clamp(44px,6vw,96px)] text-sand" />
        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.n}
              data-reveal-item=""
              className="rounded-[22px] border border-gold/20 bg-gradient-to-b from-umber to-night p-7 transition-colors duration-500 hover:border-gold/45"
            >
              <span className="label text-gold">{p.n}</span>
              <h3 className="display mt-5 text-[32px] text-sand">{p.t}</h3>
              <p className="mt-3 text-[15px] text-smoke">{p.d}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12">
          <Link href="/business" className="btn btn-primary">Trade enquiry <span aria-hidden>→</span></Link>
        </Reveal>
      </div>
    </section>
  );
}
