import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Keeps project cards in a grid the same height via CSS var `--project-card-min-h`
 * on the grid element (see `index.css` `.project-cards-grid`).
 */
export function useProjectCardFloorSync(floorsKey) {
  const projectGridRef = useRef(null);

  const syncProjectCardFloor = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const grid = projectGridRef.current;
        if (!grid) return;
        grid.style.removeProperty("--project-card-min-h");
        const nodes = [...grid.querySelectorAll("[data-project-card]")];
        if (nodes.length === 0) return;
        void grid.offsetHeight;
        const max = Math.max(
          ...nodes.map((node) => Math.max(node.offsetHeight, node.getBoundingClientRect().height)),
          0
        );
        if (max > 0) grid.style.setProperty("--project-card-min-h", `${max}px`);
      });
    });
  }, []);

  useLayoutEffect(() => {
    const grid = projectGridRef.current;
    if (!grid) return;

    let debounceId = null;
    const scheduleSync = () => {
      window.clearTimeout(debounceId);
      debounceId = window.setTimeout(() => syncProjectCardFloor(), 24);
    };

    syncProjectCardFloor();

    const ro = new ResizeObserver(() => scheduleSync());
    ro.observe(grid);
    [...grid.querySelectorAll("[data-project-card]")].forEach((node) => ro.observe(node));

    window.addEventListener("resize", scheduleSync);
    window.addEventListener("load", scheduleSync, { once: true });

    let fontsCancelled = false;
    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready.then(() => {
        if (!fontsCancelled) scheduleSync();
      });
    }

    const lateSyncId = window.setTimeout(() => scheduleSync(), 360);

    const projectsSection = document.getElementById("projects");
    let io;
    if (projectsSection && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) scheduleSync();
        },
        { root: null, rootMargin: "0px 0px 12% 0px", threshold: [0, 0.08] }
      );
      io.observe(projectsSection);
    }

    return () => {
      fontsCancelled = true;
      window.clearTimeout(lateSyncId);
      window.clearTimeout(debounceId);
      ro.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("load", scheduleSync);
      if (io) io.disconnect();
      grid.style.removeProperty("--project-card-min-h");
    };
  }, [floorsKey, syncProjectCardFloor]);

  return { projectGridRef, syncProjectCardFloor };
}
