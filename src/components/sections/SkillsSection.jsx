import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { SectionAurora } from "../aceternity/SectionAurora";
import SkillStrengthThemesMobileCarousel, { SkillStrengthThemeCard } from "../SkillStrengthThemesMobileCarousel";
import ScrollRevealItem from "../ui/ScrollRevealItem";
import { FadeContent } from "../../react-bits";
import { skillCategoryGroups, SKILL_GROUP_PILL_SURFACE } from "../../constants";
import { skillStrengthThemes, skillsNarrative } from "../../content/siteContent";
import EditorialSectionHeading from "../site/EditorialSectionHeading";
import { skillsStaggerChild, skillsStaggerParent } from "../site/skillsMotionVariants";
import AosBlock from "../ui/AosBlock";
import { motionEase, sectionWrapClass } from "../../lib/siteTokens";
import { refreshAos } from "../../utils/aosRefresh";

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    refreshAos();
  }, []);

  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-light relative overflow-x-clip overflow-y-visible">
      <SectionAurora tone="light" />
      <div className={`${sectionWrapClass} relative z-10`}>
        <FadeContent duration={800} threshold={0.12} className="w-full min-w-0">
          <AosBlock>
            <EditorialSectionHeading kicker="Toolkit" title="Skills" reverse />
          </AosBlock>
          <AosBlock delay={50}>
          <ScrollRevealItem
            className="mt-5 lg:mt-6 max-w-full xl:max-w-6xl mx-auto w-full min-w-0 lg:ml-auto lg:mr-0 flex flex-col gap-5 sm:gap-6 lg:gap-4 lg:items-end"
            y={14}
            amount={0.25}
            margin="0px 0px -10% 0px"
          >
            <p className="text-[13px] sm:text-[14px] leading-snug text-slate-600 max-w-xl lg:text-right lg:ml-auto shrink-0">
              {skillsNarrative.pitch}
            </p>
            <SkillStrengthThemesMobileCarousel themes={skillStrengthThemes} />
            <div className="hidden md:grid w-full grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {skillStrengthThemes.map((theme) => (
                <SkillStrengthThemeCard key={theme.title} theme={theme} />
              ))}
            </div>
          </ScrollRevealItem>
          </AosBlock>
          {reduceMotion ? (
            <AosBlock delay={100}>
            <div className="mt-5 lg:mt-6 max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-auto rounded-[24px] border border-brand-light/70 bg-white/75 px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7 shadow-[0_18px_48px_-36px_rgba(15,76,117,0.2)] backdrop-blur-md space-y-5 sm:space-y-5">
              {skillCategoryGroups.map((group) => (
                <div key={group.id}>
                  <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-brand-deep border-b border-brand-light/65 pb-1.5 mb-2.5">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {group.items.map((tech) => (
                      <span
                        key={`${group.id}-${tech.name}`}
                        className={`skill-pill inline-flex min-h-9 items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold border text-brand-deep ${
                          SKILL_GROUP_PILL_SURFACE[group.id] ?? "border-brand-light/75 bg-brand-chip/90"
                        }`}
                      >
                        <img
                          src={tech.skillIcon}
                          alt=""
                          className="w-5 h-5 rounded-[6px] object-contain shrink-0 shadow-sm ring-1 ring-black/[0.04]"
                          loading="lazy"
                          decoding="async"
                        />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </AosBlock>
          ) : (
            <AosBlock delay={100}>
            <motion.div
              className="mt-5 lg:mt-6 max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-auto rounded-[24px] border border-brand-light/70 bg-white/75 px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7 shadow-[0_18px_48px_-36px_rgba(15,76,117,0.2)] backdrop-blur-md space-y-5 sm:space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12, margin: "0px 0px -16% 0px" }}
              variants={skillsStaggerParent}
            >
              {skillCategoryGroups.map((group) => (
                <div key={group.id}>
                  <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-brand-deep border-b border-brand-light/65 pb-1.5 mb-2.5">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {group.items.map((tech) => (
                      <motion.span
                        key={`${group.id}-${tech.name}`}
                        variants={skillsStaggerChild}
                        whileHover={{ y: -2, transition: { duration: 0.18, ease: motionEase } }}
                        className={`skill-pill inline-flex min-h-9 items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold border text-brand-deep ${
                          SKILL_GROUP_PILL_SURFACE[group.id] ?? "border-brand-light/75 bg-brand-chip/90"
                        }`}
                      >
                        <img
                          src={tech.skillIcon}
                          alt=""
                          className="w-5 h-5 rounded-[6px] object-contain shrink-0 shadow-sm ring-1 ring-black/[0.04]"
                          loading="lazy"
                          decoding="async"
                        />
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
            </AosBlock>
          )}
        </FadeContent>
      </div>
    </section>
  );
}
