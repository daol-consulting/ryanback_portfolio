import { profileQuickLinks } from "../../content/siteContent";

export default function ProfileQuickLinks({ className = "" }) {
  if (!profileQuickLinks.length) return null;
  return (
    <nav
      aria-label="Profile links"
      className={`flex w-full max-w-full flex-wrap items-center justify-center gap-2.5 sm:gap-2 touch-manipulation [-webkit-tap-highlight-color:transparent] sm:justify-start ${className}`.trim()}
    >
      {profileQuickLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="inline-flex min-h-11 min-w-[44px] shrink-0 items-center justify-center rounded-full border border-brand-light bg-white/90 px-3.5 sm:px-4 py-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.04em] text-brand-deep hover:bg-brand-chip hover:border-brand-primary/35 transition-colors active:scale-[0.98]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
