import Link from "next/link";
import { library } from "@/content/oils";
import { Reveal, SplitText } from "@/components/motion/Reveal";

/** Archival-catalogue grid of the Oil Library (light "day" section). */
export function LibraryTeaser() {
  return (
    <section aria-labelledby="library-heading" data-header-theme="light" className="on-light bg-sand py-28 text-ink md:py-40">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-amber">The Oil Library · Coming soon</p>
            <SplitText as="h2" id="library-heading" text="Every oil, in a small bottle." italic={[2]} className="display mt-4 max-w-[14ch] text-[clamp(44px,6vw,96px)]" />
          </div>
          <p className="max-w-[34ch] text-smoke">
            Try the whole range in 3 ml and 12 ml before you choose your signature.
          </p>
        </div>

        <Reveal stagger className="mt-14 grid grid-cols-1 border-t border-paperline sm:grid-cols-2 lg:grid-cols-3">
          {library.map((oil) => (
            <article
              key={oil.code}
              data-reveal-item=""
              tabIndex={0}
              className="group relative min-h-[240px] border-b border-paperline p-7 outline-none transition-colors duration-500 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 hover:bg-[#ece2d3] focus-visible:bg-[#ece2d3]"
            >
              <div className="flex items-start justify-between">
                <span className="label text-smoke">{oil.code}</span>
                <span className="label text-smoke/70">{oil.mood}</span>
              </div>
              <h3 className="display mt-10 text-[46px]">{oil.name}</h3>
              <p className="mt-2 text-sm text-smoke">{oil.words.join(" · ")}</p>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-xs opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                <div><dt className="label text-[10px] text-amber">Top</dt><dd className="mt-1">{oil.top}</dd></div>
                <div><dt className="label text-[10px] text-amber">Heart</dt><dd className="mt-1">{oil.heart}</dd></div>
                <div><dt className="label text-[10px] text-amber">Base</dt><dd className="mt-1">{oil.base}</dd></div>
              </dl>
            </article>
          ))}
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-smoke">Oil names and notes are placeholders until our range is final.</p>
          <Link href="/collection#library" className="btn btn-dark">See the collection <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}
