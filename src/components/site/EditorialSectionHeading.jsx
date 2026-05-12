import ScrollRevealItem from "../ui/ScrollRevealItem";

/** Left rule + serif display title — asymmetric, less “boxed template”. */
export default function EditorialSectionHeading({ kicker, title, light, reverse }) {
  const rule = light ? "bg-white/35" : "bg-brand-deep/28";
  const kickerCls = light ? "text-brand-light/90" : "text-brand-deep";
  const titleCls = light ? "text-white" : "text-brand-dark";

  const inner = (
    <div className={`flex gap-4 sm:gap-5 items-start max-w-2xl ${reverse ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <div aria-hidden className={`mt-1.5 h-9 sm:h-12 w-px shrink-0 rounded-full ${rule}`} />
      <div>
        <p className={`text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase ${kickerCls}`}>{kicker}</p>
        <h2
          className={`mt-1.5 font-display text-[clamp(1.85rem,3.9vw,3.05rem)] font-semibold tracking-[-0.03em] leading-[1.06] ${titleCls}`}
        >
          {title}
        </h2>
      </div>
    </div>
  );

  return (
    <ScrollRevealItem className={reverse ? "lg:flex lg:justify-end" : ""} y={14} amount={0.45} margin="0px 0px -10% 0px">
      {inner}
    </ScrollRevealItem>
  );
}
