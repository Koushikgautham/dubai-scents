"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMotion } from "./MotionProvider";

type SplitProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "load" animates on mount (hero); "scroll" when it enters the viewport. */
  on?: "load" | "scroll";
  delay?: number;
  /** Words (0-based) to render in italic serif. */
  italic?: number[];
  id?: string;
};

/**
 * Masked word-by-word reveal. The full sentence stays available to assistive tech (sr-only);
 * the split words are decorative (aria-hidden) and fully visible without JS.
 */
export function SplitText({ text, as: Tag = "h2", className, on = "scroll", delay = 0, italic = [], id }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ready || !ref.current) return;
      const el = ref.current;
      const targets = el.querySelectorAll(".split-word");
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.06,
          delay,
          scrollTrigger: on === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
        },
      );
    },
    { scope: ref, dependencies: [ready, reduced] },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-split="">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="split-mask">
              <span className={`split-word ${italic.includes(i) ? "italic" : ""}`}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** Animate direct children with data-reveal-item in sequence. */
  stagger?: boolean;
  on?: "load" | "scroll";
};

export function Reveal({ children, className, as: Tag = "div", delay = 0, y = 28, stagger = false, on = "scroll" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (!ready || !ref.current) return;
      const el = ref.current;
      const items = stagger ? el.querySelectorAll("[data-reveal-item]") : [el];
      gsap.set(el, { autoAlpha: 1 });
      if (reduced) {
        gsap.set(items, { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(
        items,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          stagger: stagger ? 0.08 : 0,
          delay,
          scrollTrigger: on === "scroll" ? { trigger: el, start: "top 84%", once: true } : undefined,
        },
      );
    },
    { scope: ref, dependencies: [ready, reduced] },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {children}
    </Tag>
  );
}
