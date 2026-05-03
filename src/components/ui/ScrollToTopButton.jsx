import { ChevronUp } from "lucide-react";

/**
 * Fixed bottom-right control; parent controls visibility (e.g. after scroll threshold).
 */
export default function ScrollToTopButton({ reduceMotion = false }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    try {
      const path = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", path);
    } catch {
      /* file:// or restricted environments */
    }
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="fixed z-[45] inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-light/90 bg-white/95 text-brand-deep shadow-[0_10px_28px_-12px_rgba(15,76,117,0.28)] backdrop-blur-sm transition-[transform,box-shadow,background-color,border-color] hover:bg-brand-chip hover:border-brand-primary/35 hover:shadow-[0_12px_32px_-14px_rgba(15,76,117,0.32)] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep/35 touch-manipulation [-webkit-tap-highlight-color:transparent] bottom-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom,0px)))] right-[max(1rem,calc(0.75rem+env(safe-area-inset-right,0px)))] sm:bottom-[max(1.25rem,calc(1rem+env(safe-area-inset-bottom,0px)))] sm:right-[max(1.25rem,calc(1rem+env(safe-area-inset-right,0px)))]"
    >
      <ChevronUp className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
