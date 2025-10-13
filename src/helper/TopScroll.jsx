import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "./SmoothScroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, duration: 1 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
