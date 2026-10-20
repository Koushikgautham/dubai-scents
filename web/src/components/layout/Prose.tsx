import type { ReactNode } from "react";

/** Long-form reading layout for legal pages. */
export function Prose({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article data-header-theme="light" className="on-light min-h-screen bg-sand pb-28 pt-40 text-ink">
      <div className="wrap max-w-[760px]">
        <p className="label text-amber">Last updated {updated}</p>
        <h1 className="display mt-4 text-[clamp(48px,7vw,96px)]">{title}</h1>
        <div className="mt-10 space-y-5 text-[17px] leading-[1.75] [&_h2]:display [&_h2]:mt-12 [&_h2]:text-[32px] [&_li]:ml-5 [&_li]:list-disc [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </article>
  );
}
