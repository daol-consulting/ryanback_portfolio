import { useEffect } from "react";
import AOS from "aos";

/**
 * Initializes AOS once; respects reduced motion (no scroll animations).
 * Refreshes after load / delayed tick so lazy sections register in the DOM.
 */
export function useAos(reduceMotion) {
  useEffect(() => {
    AOS.init({
      duration: 680,
      easing: "ease-out-cubic",
      once: true,
      offset: 48,
      anchorPlacement: "top-bottom",
      disable: reduceMotion ? true : false,
    });

    const refresh = () => {
      requestAnimationFrame(() => AOS.refresh());
    };

    window.addEventListener("load", refresh);
    const late = window.setTimeout(refresh, 450);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(late);
    };
  }, [reduceMotion]);
}
