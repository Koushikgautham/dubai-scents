"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMotion } from "@/components/motion/MotionProvider";
import { SplitText } from "@/components/motion/Reveal";
import { notesJourney } from "@/content/oils";

/**
 * Vertical scroll drives three full-bleed chapters sideways (sticky stage + translated track).
 * Reduced motion / no JS: a normal horizontally scrollable row.
 */
export function NotesJourney() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();
  const animated = ready && !reduced;

  useGSAP(
    () => {
      if (!animated || !section.current || !track.current) return;
      const t = track.current;
      const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]", t);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onUpdate: (self) => {
            const idx = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length * 0.999));
            dots.current?.querySelectorAll("[data-dot]").forEach((d, i) => d.classList.toggle("bg-sand", i === idx));
          },
        },
      });
      tl.to(t, { x: () => -(t.scrollWidth - window.innerWidth), duration: 1 });
      // inner parallax on the big titles
      scenes.forEach((s) => {
        const title = s.querySelector("[data-scene-title]");
        if (title) tl.fromTo(title, { xPercent: 12 }, { xPercent: -12, duration: 1 }, 0);
      });
    },
    { scope: section, dependencies: [animated] },
  );

  return (
    <section
      ref={section}
      aria-labelledby="notes-heading"
      className="relative bg-[linear-gradient(var(--color-night),var(--color-umber))]"
      style={animated ? { height: `${notesJourney.length * 100 + 40}svh` } : undefined}
    >
      <div className={animated ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-20" : "py-28"}>
        <div className="wrap mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="label text-gold">How a scent unfolds</p>
            <SplitText as="h2" id="notes-heading" text="Top, heart, base." className="display mt-3 text-[clamp(40px,5.5vw,84px)] text-sand" />
          </div>
          <div ref={dots} className="hidden items-center gap-2 md:flex" aria-hidden="true">
            {notesJourney.map((n) => (
              <span key={n.step} data-dot="" className="h-1.5 w-8 rounded-full bg-sand/25 transition-colors duration-500" />
            ))}
          </div>
        </div>
        <div
          ref={track}
          className={`flex gap-5 px-[clamp(20px,4vw,48px)] ${animated ? "w-max" : "snap-x snap-mandatory overflow-x-auto"}`}
        >
          {notesJourney.map((n) => (
            <article
              key={n.step}
              data-scene=""
              className={`grain relative flex h-[58svh] max-h-[640px] min-h-[380px] w-[86vw] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-br p-7 md:w-[72vw] md:p-12 ${n.tone}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgba(255,220,170,0.28),transparent_70%)]" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
              <p className="label absolute left-7 top-7 text-sand/80 md:left-12 md:top-10">
                {n.step} · {n.label}
              </p>
              <h3 data-scene-title="" className="display relative text-[clamp(52px,8.5vw,140px)] text-sand">
                {n.title}
              </h3>
              <p className="relative mt-4 max-w-[38ch] text-sand/85">{n.text}</p>
            </article>
          ))}
        </div>
        <p className="wrap mt-6 text-xs text-smoke">Example profile. Our final oils are chosen after we visit our perfumers in December.</p>
      </div>
    </section>
  );
}
