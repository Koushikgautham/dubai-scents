"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotion } from "@/components/motion/MotionProvider";
import { SplitText, Reveal } from "@/components/motion/Reveal";

const BottleCanvas = dynamic(() => import("@/components/three/BottleCanvas"), { ssr: false });

const callouts = [
  { k: "Alcohol-free", d: "No ethanol carrier. Just perfume oil.", side: "left" },
  { k: "Concentrated perfume oil", d: "A few drops are all you need.", side: "right" },
  { k: "Fragrance oils from UAE manufacturers", d: "Sourced from perfumers in the Emirates.", side: "left" },
  { k: "Bottled in India", d: "Filled, sealed and labelled here.", side: "right" },
] as const;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static stand-in (a still of the same 3D bottle) for reduced motion, no WebGL, or before the canvas mounts. */
function BottlePoster() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[9vh] md:items-center md:justify-end md:pr-[9vw] md:pt-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bottle-poster.png"
        alt=""
        width={420}
        height={690}
        className="h-[44vh] w-auto md:h-[74vh]"
        decoding="async"
      />
    </div>
  );
}

export function ProductStage() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();
  const [use3D, setUse3D] = useState(false);
  const [active, setActive] = useState(true);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLowPower(coarse || (navigator.hardwareConcurrency ?? 8) <= 4);
    setUse3D(!reduced && hasWebGL());
  }, [ready, reduced]);

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
      {/* Sticky visual layer: glow + 3D bottle */}
      <div className="sticky top-0 -mb-[100svh] h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_62%_58%,rgba(199,122,26,0.30),transparent_70%)] md:bg-[radial-gradient(45%_55%_at_70%_55%,rgba(199,122,26,0.32),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        <div ref={canvasWrap} className="absolute inset-0">
          {use3D ? <BottleCanvas progress={progress} active={active} eventSource={stageRef} lowPower={lowPower} /> : <BottlePoster />}
        </div>
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
