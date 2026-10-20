"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, nav } from "@/config/brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Switch to the light header while a light section sits under it.
      const probe = 36;
      const lightNow = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme='light']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setLight(lightNow);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? light && !open
            ? "border-b border-paperline/60 bg-sand/80 backdrop-blur-md"
            : "border-b border-gold/10 bg-night/70 backdrop-blur-md"
          : "border-b border-transparent"
      } ${light && !open ? "header-light" : ""}`}
    >
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href="/" className="display text-[26px] text-sand" aria-label={`${brand.name} home`}>
          {brand.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[14px] text-dune transition-colors hover:text-sand">
              {n.label}
            </Link>
          ))}
          <Link href="/#waitlist" className="btn btn-ghost py-2.5 text-[14px]">Join waitlist</Link>
        </nav>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-px w-6 bg-sand transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-6 bg-sand transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="wrap flex flex-col gap-1 pb-8 md:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="display py-2 text-[40px] text-sand">
              {n.label}
            </Link>
          ))}
          <Link href="/#waitlist" className="btn btn-primary mt-4 w-fit">Join the waitlist</Link>
        </nav>
      ) : null}
    </header>
  );
}
