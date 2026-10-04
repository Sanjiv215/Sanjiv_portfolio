"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once (or while, if once=false) the element intersects the viewport. */
export function useInView<T extends Element>(ref: RefObject<T | null>, options: IntersectionObserverInit = {}, once = true) {
  const [inView, setInView] = useState(false);
  const { root, rootMargin, threshold } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting && once) io.disconnect();
    }, { root, rootMargin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, root, rootMargin, threshold]);
  return inView;
}

/** Calls onProgress with how far (0–1) the element has travelled past the given viewport line. */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>, onProgress: (p: number) => void, line = 0.6) {
  const cb = useRef(onProgress);
  useEffect(() => { cb.current = onProgress; });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      cb.current(Math.min(1, Math.max(0, (innerHeight * line - r.top) / r.height)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [ref, line]);
}
