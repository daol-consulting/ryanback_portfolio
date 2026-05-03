import { cn } from "../../lib/utils";

/**
 * Aceternity-style rotating conic gradient border.
 * Keeps interior surface white/minimal per DESIGN.md.
 */
export function MovingBorderCard({ children, className, innerClassName }) {
  return (
    <div className={cn("relative rounded-2xl p-px overflow-hidden shadow-sm", className)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-[-1000%] animate-spin-slow opacity-90",
          "bg-[conic-gradient(from_0deg,transparent_0deg,rgba(50,130,184,0.55)_72deg,rgba(15,76,117,0.45)_156deg,rgba(187,225,250,0.55)_236deg,transparent_360deg)]"
        )}
      />
      <div
        className={cn(
          "relative rounded-[15px] bg-white ring-1 ring-brand-light/80",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
