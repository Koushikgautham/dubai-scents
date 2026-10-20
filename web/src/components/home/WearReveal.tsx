"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMotion } from "@/components/motion/MotionProvider";

const TEXT =
  "Oils carry no alcohol, so they don't flash off in a burst. They sit close to the skin and unfold slowly, note by note, the way a scent should.";

/** Scroll-scrubbed word reveal: words brighten as you read down the page. */
export function WearReveal() {
  const ref = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();
  const words = TEXT.split(" ");

  useGSAP(
    () => {
      if (!ready || reduced || !ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll("[data-w]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: 0.8 },
        },
      );
    },
    { scope: ref, dependencies: [ready, reduced] },
  );

  return (
    <section ref={ref} aria-labelledby="wear-heading" data-header-theme="light" className="on-light bg-sand pb-36 pt-6 text-ink md:pb-48">
      <div className="wrap">
        <p id="wear-heading" className="label text-amber">How oils wear</p>
        <p className="display mt-6 max-w-[20ch] text-[clamp(32px,4.4vw,64px)] leading-[1.12]">
          <span className="sr-only">{TEXT}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <span key={i} data-w="" className="inline">
                {w}{i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
