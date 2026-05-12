import AOS from "aos";

/** Call after lazy section mounts or layout shifts so new `data-aos` nodes are observed. */
export function refreshAos() {
  requestAnimationFrame(() => {
    try {
      AOS.refresh();
    } catch {
      /* AOS not initialized yet */
    }
  });
}
