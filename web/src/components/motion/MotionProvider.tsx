"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 0.85 });

type MotionState = { reduced: boolean; ready: boolean };
const MotionContext = createContext<MotionState>({ reduced: true, ready: false });

export function useMotion() {
  return useContext(MotionContext);
}

/**
 * Sole smooth-scroll engine (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Under prefers-reduced-motion, Lenis is never created and components render final states.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MotionState>({ reduced: true, ready: false });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq.matches;
    if (!reduced) document.documentElement.classList.add("has-motion");
    // Sync the motion state from the browser after mount (not available during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ reduced, ready: true });

    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      document.documentElement.classList.remove("has-motion");
    };
  }, []);

  return <MotionContext.Provider value={state}>{children}</MotionContext.Provider>;
}
