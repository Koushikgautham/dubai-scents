"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotion } from "@/components/motion/MotionProvider";
import { SplitText, Reveal } from "@/components/motion/Reveal";
import { BottleSequence } from "@/components/home/BottleSequence";

const callouts = [
  { k: "Alcohol-free", d: "No ethanol carrier. Just perfume oil.", side: "left" },
  { k: "Concentrated perfume oil", d: "A few drops are all you need.", side: "right" },
  { k: "Fragrance oils from UAE manufacturers", d: "Sourced from perfumers in the Emirates.", side: "left" },
  { k: "Bottled in India", d: "Filled, sealed and labelled here.", side: "right" },
] as const;

export function ProductStage() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const bottle = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();
  const [active, setActive] = useState(true);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    // Smaller frame set for phones and narrow screens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSmall(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  // Pause rendering when the stage is offscreen or the tab is hidden.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let visible = true;
    const update = () => setActive(visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!ready || reduced || !stageRef.current) return;
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current = self.progress;
          if (bar.current) bar.current.style.transform = `scaleY(${self.progress})`;
        },
      });
      if (canvasWrap.current) {
        gsap.fromTo(canvasWrap.current, { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1.8, ease: "expo.out", delay: 0.15 });
      }
      // Desktop: the bottle starts beside the headline, then glides to centre stage over the first screen.
      const mm = gsap.matchMedia();
      // Phones: the bottle starts smaller so it clears the hero copy, then grows into the stage.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          bottle.current,
          { scale: 0.72, transformOrigin: "50% 0%" },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: stageRef.current, start: "top top", end: () => `+=${window.innerHeight}`, scrub: true },
          },
        );
      });
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          bottle.current,
          { xPercent: 52 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: stageRef.current, start: "top top", end: () => `+=${window.innerHeight}`, scrub: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-callout]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 30%", toggleActions: "play reverse play reverse" },
          },
        );
      });
    },
    { scope: stageRef, dependencies: [ready, reduced] },
  );

  return (
    <section ref={stageRef} aria-label="Introducing our perfume oil" className="relative bg-night">
      {/* Sticky visual layer: Blender-rendered bottle sequence (its glow is baked into the frames) */}
      <div className="sticky top-0 -mb-[100svh] h-[100svh] w-full overflow-hidden">
        <div ref={canvasWrap} className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[4svh] md:items-center md:pt-0">
          <div ref={bottle} className="relative w-[min(100vw,72svh)] md:w-[min(64vw,80svh)]">
            <BottleSequence
              progress={progress}
              active={active && !reduced}
              small={small}
              className="seq-mask relative aspect-[4/5] w-full"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        {/* progress rule */}
        <div className="absolute left-[clamp(20px,4vw,48px)] top-1/2 hidden h-40 w-px -translate-y-1/2 bg-gold/20 md:block">
          <div ref={bar} className="h-full w-px origin-top scale-y-0 bg-gold" />
        </div>
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">
        {/* HERO */}
        <div className="wrap flex min-h-[100svh] flex-col justify-end pb-[14vh] pt-32 md:justify-center md:pb-0">
          <div className="max-w-[640px]">
            <Reveal on="load" delay={0.1}>
              <p className="label text-gold">Alcohol-free perfume oils</p>
            </Reveal>
            <SplitText
              as="h1"
              on="load"
              delay={0.35}
              text="Fragrance, concentrated."
              italic={[1]}
              className="display mt-5 text-[clamp(56px,10vw,152px)] text-sand"
            />
            <Reveal on="load" delay={0.95}>
              <p className="mt-7 max-w-[34ch] text-[19px] text-dune">
                Perfume oils with no alcohol, made to sit close to the skin. Coming soon.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#waitlist" className="btn btn-primary">Join the waitlist</Link>
                <Link href="/business" className="btn btn-ghost">For business <span aria-hidden>→</span></Link>
              </div>
            </Reveal>
          </div>
          <p className="absolute bottom-6 right-[clamp(20px,4vw,48px)] text-xs text-smoke">Bottle shown is a design concept.</p>
        </div>

        {/* ANATOMY callouts */}
        <div aria-label="What's in the bottle">
          {callouts.map((c, i) => (
            <div key={c.k} className="wrap flex min-h-[100svh] items-end pb-[16vh] md:items-center md:pb-0">
              <div
                data-callout=""
                className={`max-w-[380px] rounded-2xl bg-night/40 p-5 backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-none ${c.side === "right" ? "md:ml-auto md:text-right" : ""}`}
              >
                <p className="label text-gold">{String(i + 1).padStart(2, "0")} / 04</p>
                <h2 className="display mt-3 text-[clamp(36px,4.6vw,64px)] text-sand">{c.k}</h2>
                <p className="mt-3 text-dune">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
