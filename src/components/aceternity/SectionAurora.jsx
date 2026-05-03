import { cn } from "../../lib/utils";

/**
 * Aceternity-like soft mesh (no grid): slow-drifting blurred orbs.
 * tone maps to section background family.
 */
export function SectionAurora({ tone = "surface", className }) {
  const presets = {
    surface: (
      <>
        <div
          className="acet-orb acet-orb-a absolute -left-[12%] -top-[45%] h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-brand-primary/25 blur-[100px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-b absolute -right-[8%] top-[15%] h-[min(360px,60vw)] w-[min(360px,60vw)] rounded-full bg-brand-light/45 blur-[110px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-c absolute bottom-[-20%] left-[20%] h-[min(340px,55vw)] w-[min(480px,90vw)] rounded-full bg-brand-deep/12 blur-[120px]"
          aria-hidden
        />
      </>
    ),
    light: (
      <>
        <div
          className="acet-orb acet-orb-a absolute -left-[10%] -top-[40%] h-[min(400px,68vw)] w-[min(400px,68vw)] rounded-full bg-brand-primary/18 blur-[95px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-b absolute right-[-5%] top-[25%] h-[min(320px,58vw)] w-[min(320px,58vw)] rounded-full bg-brand-light/50 blur-[105px]"
          aria-hidden
        />
      </>
    ),
    surfaceAlt: (
      <>
        <div
          className="acet-orb acet-orb-a absolute -right-[12%] -top-[35%] h-[min(380px,65vw)] w-[min(380px,65vw)] rounded-full bg-brand-primary/22 blur-[100px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-b absolute -left-[15%] bottom-[-25%] h-[min(420px,72vw)] w-[min(420px,72vw)] rounded-full bg-brand-light/35 blur-[115px]"
          aria-hidden
        />
      </>
    ),
    dark: (
      <>
        <div
          className="acet-orb acet-orb-a absolute -left-[5%] -top-[30%] h-[min(440px,75vw)] w-[min(440px,75vw)] rounded-full bg-brand-primary/35 blur-[110px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-b absolute -right-[10%] top-[20%] h-[min(360px,62vw)] w-[min(360px,62vw)] rounded-full bg-white/[0.07] blur-[100px]"
          aria-hidden
        />
        <div
          className="acet-orb acet-orb-c absolute bottom-[-15%] left-[15%] h-[min(300px,50vw)] w-[min(520px,95vw)] rounded-full bg-brand-deep/40 blur-[130px]"
          aria-hidden
        />
      </>
    ),
  };

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {presets[tone] ?? presets.surface}
    </div>
  );
}
