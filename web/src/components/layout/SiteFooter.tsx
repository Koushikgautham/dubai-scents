import Link from "next/link";
import { brand, nav } from "@/config/brand";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="border-t border-gold/10 bg-night py-16 text-[14px] text-smoke">
      <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-[34px] text-sand">{brand.name}</p>
          <p className="mt-3 max-w-[36ch]">{brand.tagline}. {brand.originLine}.</p>
          <p className="mt-2">{brand.city}</p>
        </div>
        <nav aria-label="Footer">
          <p className="label mb-4 text-gold">Explore</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}><Link className="transition-colors hover:text-sand" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label mb-4 text-gold">Legal</p>
          <ul className="space-y-2">
            <li><Link className="transition-colors hover:text-sand" href="/privacy">Privacy notice</Link></li>
            <li><Link className="transition-colors hover:text-sand" href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-14 flex flex-wrap justify-between gap-4 text-xs">
        <p>© {year} {brand.name}{brand.isWorkingName ? " (working name)" : ""}. Pre-launch — products are not yet on sale.</p>
        <p>Bottle visuals are design concepts.</p>
      </div>
    </footer>
  );
}
