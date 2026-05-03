import { useCallback, useEffect, useRef, useState } from "react";

const cardShellClass =
  "rounded-[20px] border border-brand-light/70 bg-white/80 p-4 md:p-5 shadow-[0_14px_40px_-28px_rgba(15,76,117,0.16)] backdrop-blur-sm transition-colors hover:border-brand-primary/38 h-full min-h-[12.5rem] flex flex-col";

export function SkillStrengthThemeCard({ theme, className = "" }) {
  return (
    <div className={`${cardShellClass} ${className}`.trim()}>
      <p className="font-display font-semibold text-[14px] md:text-[15px] text-slate-900 leading-snug">{theme.title}</p>
      <ul className="mt-2 flex-1 space-y-1.5 text-[12px] md:text-[13px] text-slate-600 leading-snug list-disc list-outside pl-3.5">
        {theme.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Horizontal snap carousel for skill strength cards — viewports below `md` only.
 * Narrower slides so adjacent cards peek (swipe affordance); no arrow controls.
 */
export default function SkillStrengthThemesMobileCarousel({ themes }) {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = root.querySelectorAll("[data-skill-strength-slide]");
    if (!slides.length) return;
    const rootRect = root.getBoundingClientRect();
    const rootCenter = rootRect.left + rootRect.width / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - rootCenter);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    setActive(bestIdx);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onScroll = () => {
      window.requestAnimationFrame(updateActiveFromScroll);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    updateActiveFromScroll();
    return () => root.removeEventListener("scroll", onScroll);
  }, [themes.length, updateActiveFromScroll]);

  const scrollToIndex = (i) => {
    const root = scrollerRef.current;
    const slide = root?.querySelector(`[data-skill-strength-slide][data-index="${i}"]`);
    if (!root || !slide) return;
    const slideLeft = slide.offsetLeft;
    const slideW = slide.offsetWidth;
    let left = slideLeft - (root.clientWidth - slideW) / 2;
    const maxLeft = Math.max(0, root.scrollWidth - root.clientWidth);
    left = Math.max(0, Math.min(maxLeft, left));
    root.scrollTo({ left, behavior: "smooth" });
    window.setTimeout(updateActiveFromScroll, 280);
  };

  const n = themes.length;

  return (
    <div className="md:hidden w-full min-w-0">
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skill strength highlights — swipe sideways"
        aria-live="polite"
        className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth scroll-pl-3 scroll-pr-3 px-1 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
      >
        {themes.map((theme, i) => (
          <div
            key={theme.title}
            data-skill-strength-slide
            data-index={i}
            className="snap-center shrink-0 w-[min(22rem,82vw)] max-w-[min(22rem,82vw)]"
          >
            <SkillStrengthThemeCard theme={theme} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col items-center gap-2.5 px-1 pb-0.5">
        <p
          className="text-[12px] font-semibold tabular-nums tracking-[0.12em] text-brand-deep"
          aria-live="polite"
          aria-atomic
        >
          <span className="sr-only">Slide </span>
          {active + 1} <span className="text-slate-400 font-medium">/</span> {n}
        </p>
        <div className="flex flex-wrap justify-center gap-2" aria-label="Slide indicators">
          {themes.map((_, i) => (
            <button
              key={String(i)}
              type="button"
              aria-label={`Go to slide ${i + 1} of ${n}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center touch-manipulation [-webkit-tap-highlight-color:transparent]"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  active === i ? "h-2.5 w-8 bg-brand-deep" : "h-2 w-2 bg-brand-light ring-1 ring-brand-light/80"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
