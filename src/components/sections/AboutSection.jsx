import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { aboutProfile } from "../../assets";
import { SectionAurora } from "../aceternity/SectionAurora";
import { FadeContent } from "../../react-bits";
import EditorialSectionHeading from "../site/EditorialSectionHeading";
import ProfileQuickLinks from "../site/ProfileQuickLinks";
import AosBlock from "../ui/AosBlock";
import ScrollRevealItem from "../ui/ScrollRevealItem";
import { certifications, educations, profileAbout } from "../../content/siteContent";
import { motionEase, sectionWrapClass } from "../../lib/siteTokens";
import { refreshAos } from "../../utils/aosRefresh";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    refreshAos();
  }, []);

  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden rounded-t-3xl md:rounded-t-[2rem]">
      <SectionAurora tone="surface" />
      <div className={`${sectionWrapClass} relative z-10`}>
        <FadeContent duration={900} threshold={0.15} className="w-full">
          <AosBlock>
            <EditorialSectionHeading kicker="Profile" title="About" />
            <ProfileQuickLinks className="mt-4 sm:mt-5" />
          </AosBlock>
          <AosBlock delay={70} className="relative mt-6 md:mt-10 flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-10 xl:gap-11 md:justify-between">
            <div
              aria-hidden
              className="about-profile-bg-shell relative isolate mx-auto mb-6 shrink-0 overflow-hidden aspect-[824/1024] w-full max-w-[260px] sm:max-w-[min(300px,calc(100vw-3rem))] rounded-2xl border border-brand-light/35 shadow-[0_12px_40px_-28px_rgba(15,76,117,0.35)] md:mx-0 md:mb-0 md:w-[17rem] lg:w-[18.5rem] xl:w-[19rem]"
            >
              <img
                src={aboutProfile}
                alt=""
                width={824}
                height={1024}
                decoding="async"
                className="about-profile-photo about-profile-bg-photo"
              />
              <div className="about-profile-edge-blur" />
            </div>

            <ScrollRevealItem
              className="relative z-[2] flex-1 min-w-0 space-y-5 md:space-y-6 w-full"
              x={18}
              y={16}
              delay={0.12}
            >
              <div className="space-y-3 sm:space-y-3.5">
                <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-brand-deep">
                  {profileAbout.eyebrow}
                </p>
                {profileAbout.paragraphs.map((p, i) => (
                  <p key={`profile-about-${i}`} className="text-[15px] sm:text-[16px] leading-[1.68] sm:leading-[1.72] text-slate-600 mobile-safe-text">
                    {p}
                  </p>
                ))}
                <p className="text-[13px] sm:text-[14px] leading-snug text-slate-700 border-l-2 border-brand-primary/35 pl-3 py-0.5">
                  {profileAbout.principle}
                </p>
                <motion.div
                  className="h-px max-w-xs bg-gradient-to-r from-brand-deep/35 to-transparent"
                  aria-hidden
                  initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.65, delay: 0.28, ease: motionEase }}
                  style={{ originX: 0 }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-12 gap-y-5 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
                <div>
                  <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-brand-deep">Credentials</p>
                  <ul className="mt-2.5 space-y-2 border-l border-brand-deep/15 pl-3 sm:pl-4">
                    {certifications.map((c) => (
                      <li key={c.name + c.year}>
                        <span className="font-medium text-slate-800 text-[13px] sm:text-[14px]">{c.name}</span>
                        <span className="text-slate-500 text-[12px] sm:text-[13px]">
                          {" "}
                          · {c.issuer}, {c.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="education">
                  <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-brand-deep">Education</p>
                  <ul className="mt-2.5 space-y-3 border-l border-brand-deep/15 pl-3 sm:pl-4">
                    {educations.map((edu) => (
                      <li key={edu.degree}>
                        <p className="font-display font-semibold text-[15px] sm:text-[16px] leading-snug text-slate-900 mobile-safe-text">
                          {edu.degree}
                        </p>
                        <p className="mt-1 text-[13px] text-slate-600">{edu.school}</p>
                        <p className="mt-0.5 text-[12px] text-slate-500">{edu.highlights}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollRevealItem>
          </AosBlock>
        </FadeContent>
      </div>
    </section>
  );
}
