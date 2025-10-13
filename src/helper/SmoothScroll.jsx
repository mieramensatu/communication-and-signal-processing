import Lenis from "lenis";
import { useEffect } from "react";

let lenisInstance = null;

export const getLenis = () => lenisInstance;

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || lenisInstance) return;

    function easeOutQuad(x) {
      return 1 - (1 - x) * (1 - x);
    }

    lenisInstance = new Lenis({
      easing: easeOutQuad,
      duration: 1.2,
      smooth: true,
      direction: "vertical",
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisInstance.on("scroll", (e) => {});

    return () => {};
  }, []);

  return null;
}
