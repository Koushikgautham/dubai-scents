"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Scroll-scrubbed image sequence of the Blender-rendered roll-on (web/assets-src/rollon.blend).
 * Frames: turn and settle → cap unscrews and lifts → camera moves in on the roller ball and oil.
 */
export const sequence = {
  frameCount: 120,
  desktop: { dir: "/bottle/d", width: 864, height: 1080 },
  mobile: { dir: "/bottle/m", width: 576, height: 720 },
  posterFrame: 0,
  /** Damping toward the scroll target, per second; scroll position still decides the final frame. */
  smoothing: 9,
} as const;

export const frameUrl = (dir: string, i: number) => `${dir}/${String(i + 1).padStart(4, "0")}.webp`;

/** Load order: coarse-to-fine, so a fast scrub always has a nearby frame to show. */
function loadOrder(n: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(n - 1)) order.splice(1, 0, n - 1);
  return order;
}

/** Paint the requested frame, or the nearest one already loaded. Skips repaints of the same frame. */
function drawFrame(
  canvas: HTMLCanvasElement | null,
  frames: (HTMLImageElement | null)[],
  drawn: { current: number },
  index: number,
) {
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;
  const n = frames.length;
  const i = Math.min(n - 1, Math.max(0, index));
  let pick = -1;
  for (let d = 0; d < n; d++) {
    if (frames[i - d]) { pick = i - d; break; }
    if (frames[i + d]) { pick = i + d; break; }
  }
  if (pick < 0 || pick === drawn.current) return;
  ctx.drawImage(frames[pick]!, 0, 0, canvas.width, canvas.height);
  drawn.current = pick;
}

type Props = {
  progress: RefObject<number>;
  active: boolean;
  small: boolean;
  className?: string;
};

export function BottleSequence({ progress, active, small, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const drawn = useRef(-1);
  const current = useRef(0);
  const set = small ? sequence.mobile : sequence.desktop;

  // Progressive loading, at most 6 requests in flight.
  useEffect(() => {
    let cancelled = false;
    const n = sequence.frameCount;
    frames.current = new Array(n).fill(null);
    drawn.current = -1;
    const queue = loadOrder(n);
    const loadNext = () => {
      if (cancelled) return;
      const i = queue.shift();
      if (i === undefined) return;
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(set.dir, i);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames.current[i] = img;
          drawn.current = -1; // a closer frame may now be available
        })
        .catch(() => {})
        .finally(loadNext);
    };
    for (let k = 0; k < 6; k++) loadNext();
    return () => {
      cancelled = true;
    };
  }, [set.dir]);

  // Size the backing store to the element (DPR capped at 2) and repaint on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.min(Math.round(r.width * dpr), set.width);
      canvas.height = Math.min(Math.round(r.height * dpr), set.height);
      drawn.current = -1;
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [set.width, set.height]);

  // Render loop: runs only while the stage is visible.
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const target = (progress.current ?? 0) * (sequence.frameCount - 1);
      current.current += (target - current.current) * (1 - Math.exp(-sequence.smoothing * dt));
      if (Math.abs(target - current.current) < 0.01) current.current = target;
      drawFrame(canvasRef.current, frames.current, drawn, Math.round(current.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, progress]);

  return (
    <div className={className}>
      {/* Poster under the canvas: visible until the first frame paints, and without JS. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameUrl(set.dir, sequence.posterFrame)}
        alt=""
        width={set.width}
        height={set.height}
        className="absolute inset-0 h-full w-full"
        decoding="async"
        fetchPriority="high"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
