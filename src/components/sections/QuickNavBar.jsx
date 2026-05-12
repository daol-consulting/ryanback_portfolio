import { motion } from "framer-motion";
import { pageSections } from "../../lib/siteTokens";

export default function QuickNavBar({
  showQuickNav,
  navDepth,
  activeSection,
  reduceMotion,
  navigateToSection,
}) {
  return (
    <div
      className={`fixed top-[max(0.75rem,env(safe-area-inset-top))] left-0 right-0 z-40 pointer-events-none transition-all duration-300 ${
        showQuickNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      }`}
    >
      <div className="relative w-full max-w-7xl 2xl:max-w-[min(88rem,calc(100vw-4rem))] mx-auto section-pad-x">
        <nav
          className={`quick-nav w-fit max-w-full min-w-0 mx-auto pointer-events-auto rounded-full px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 lg:px-3.5 lg:py-2 ${navDepth === 0 ? "is-top" : ""} ${navDepth === 1 ? "is-mid" : ""} ${navDepth === 2 ? "is-deep" : ""}`}
        >
          <ul className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto whitespace-nowrap snap-x snap-mandatory [-webkit-overflow-scrolling:touch] overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pl-0.5 pr-1.5 sm:pl-1 sm:pr-2">
            {pageSections.map((section) => (
              <li key={section} className="shrink-0 snap-start">
                <a
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(section);
                  }}
                  className={`relative z-0 inline-flex min-h-11 min-w-[44px] items-center justify-center overflow-hidden rounded-full px-3 sm:px-3.5 py-2 text-[11px] sm:text-[12px] font-semibold tracking-wide transition-colors duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                    activeSection === section ? "text-white" : "text-brand-deep hover:bg-brand-chip/90"
                  }`}
                >
                  {activeSection === section && !reduceMotion ? (
                    <motion.span
                      layoutId="quick-nav-active-pill"
                      className="pointer-events-none absolute inset-0 rounded-full bg-brand-deep shadow-[0_2px_10px_rgba(15,76,117,0.22)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  {activeSection === section && reduceMotion ? (
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-deep" />
                  ) : null}
                  <span className="relative z-[1] capitalize">{section}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
