import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { heroProfiles, library } from "@/content/oils";

export const metadata: Metadata = {
  title: "Collection",
  description: "Three signature alcohol-free perfume oil roll-ons and the Oil Library. Coming soon.",
};

const swatch: Record<string, string> = {
  "RO-I": "from-[#3d1405] via-[#a4520f] to-[#e3a046]",
  "RO-II": "from-[#2c1d10] via-[#8a6a43] to-[#e2cfae]",
  "RO-III": "from-[#0f0a07] via-[#3a2416] to-[#7a4a22]",
};

export default function CollectionPage() {
  return (
    <>
      <PageIntro
        label="The collection · Coming soon"
        title="Three signatures, one library."
        italic={[3]}
        intro="Our first range: three signature roll-ons, plus a library of every oil we carry in small sizes. All alcohol-free, all concentrated perfume oil."
      />

      <section aria-labelledby="sig-heading" className="bg-night pb-28">
        <div className="wrap">
          <h2 id="sig-heading" className="sr-only">Signature roll-ons</h2>
          <Reveal stagger className="grid gap-6 md:grid-cols-3">
            {heroProfiles.map((p) => (
              <article key={p.code} data-reveal-item="" className="group overflow-hidden rounded-[26px] border border-gold/15 bg-umber">
                <div className={`grain relative aspect-[4/5] bg-gradient-to-b ${swatch[p.code]}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,rgba(255,225,180,0.35),transparent_70%)] transition-opacity duration-700 group-hover:opacity-70" />
                  <span className="label absolute left-6 top-6 text-sand/80">{p.code}</span>
                  <span className="absolute bottom-6 left-6 text-xs text-sand/70">Photography coming after our December shoot</span>
                </div>
                <div className="p-7">
                  <h3 className="display text-[44px] text-sand">{p.name}</h3>
                  <p className="mt-2 text-dune">{p.line}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-gold/15 pt-5 text-xs text-smoke">
                    <div><dt className="label text-[10px] text-gold">Top</dt><dd className="mt-1">{p.oil.top}</dd></div>
                    <div><dt className="label text-[10px] text-gold">Heart</dt><dd className="mt-1">{p.oil.heart}</dd></div>
                    <div><dt className="label text-[10px] text-gold">Base</dt><dd className="mt-1">{p.oil.base}</dd></div>
                  </dl>
                  <p className="mt-6 text-sm text-smoke">6 ml and 12 ml roll-on · Coming soon</p>
                </div>
              </article>
            ))}
          </Reveal>
          <p className="mt-6 text-xs text-smoke">Names and notes are placeholders until our range is final.</p>
        </div>
      </section>

      <section id="library" aria-labelledby="lib-heading" data-header-theme="light" className="on-light scroll-mt-20 bg-sand py-28 text-ink md:py-36">
        <div className="wrap">
          <p className="label text-amber">The Oil Library</p>
          <SplitText as="h2" id="lib-heading" text="Every oil we carry, in 3 ml and 12 ml." className="display mt-4 max-w-[18ch] text-[clamp(40px,5vw,80px)]" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <caption className="sr-only">Oil Library: codes, names and notes</caption>
              <thead>
                <tr className="border-b border-ink/20">
                  {["Code", "Oil", "Top", "Heart", "Base", "Mood"].map((h) => (
                    <th key={h} scope="col" className="label py-4 pr-6 font-normal text-smoke">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {library.map((o) => (
                  <tr key={o.code} className="border-b border-paperline transition-colors hover:bg-[#ece2d3]">
                    <td className="label py-5 pr-6 text-smoke">{o.code}</td>
                    <th scope="row" className="display py-5 pr-6 text-[30px] font-normal">{o.name}</th>
                    <td className="py-5 pr-6">{o.top}</td>
                    <td className="py-5 pr-6">{o.heart}</td>
                    <td className="py-5 pr-6">{o.base}</td>
                    <td className="py-5 pr-6 text-smoke">{o.mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-20 grid items-end gap-10 md:grid-cols-2">
            <div>
              <h3 className="display text-[clamp(36px,4vw,60px)]">Be first in line.</h3>
              <p className="mt-3 max-w-[40ch] text-smoke">One email when the collection launches, with early access to the Oil Library.</p>
            </div>
            <WaitlistForm source="collection" tone="light" />
          </div>
        </div>
      </section>
    </>
  );
}
