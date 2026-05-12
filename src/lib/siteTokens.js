/** Shared layout / surface tokens for page sections (single source of truth). */
export const sectionWrapClass =
  "w-full max-w-7xl 2xl:max-w-[min(88rem,calc(100vw-4rem))] mx-auto section-pad-x py-8 sm:py-12 md:py-16 lg:py-[4.5rem] xl:py-20";

export const glassPanelClass =
  "rounded-[22px] border border-brand-light/65 bg-white/90 p-3.5 sm:p-5 md:p-6 shadow-[0_14px_40px_-28px_rgba(15,76,117,0.18)] backdrop-blur-sm transition-colors duration-300 hover:border-brand-primary/38";

export const motionEase = [0.22, 1, 0.36, 1];

export const pageSections = ["about", "skills", "career", "projects", "contact"];

/** Scroll offset when jumping to a section (fixed quick nav + breathing room). */
export const NAV_SCROLL_OFFSET = 96;

/** Viewport line (px from top): section is “active” once its top crosses this. */
export const NAV_ACTIVATION_TOP = 128;
