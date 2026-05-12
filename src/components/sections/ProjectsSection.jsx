import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { SectionAurora } from "../aceternity/SectionAurora";
import ScrollRevealItem from "../ui/ScrollRevealItem";
import ProjectDemoVideo from "../ui/ProjectDemoVideo";
import { projects } from "../../content/siteContent";
import EditorialSectionHeading from "../site/EditorialSectionHeading";
import { useProjectCardFloorSync } from "../../hooks/useProjectCardFloorSync";
import AosBlock from "../ui/AosBlock";
import { glassPanelClass, motionEase, sectionWrapClass } from "../../lib/siteTokens";
import { refreshAos } from "../../utils/aosRefresh";

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const projectFloorsKey = projects.map((p) => p.slug ?? p.name).join("|");
  const { projectGridRef, syncProjectCardFloor } = useProjectCardFloorSync(projectFloorsKey);

  useEffect(() => {
    refreshAos();
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface-alt relative overflow-hidden">
      <SectionAurora tone="surfaceAlt" />
      <div className={`${sectionWrapClass} relative z-10`}>
        <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
          <AosBlock>
            <EditorialSectionHeading kicker="Selected work" title="Projects" reverse />
          </AosBlock>
          <div
            ref={projectGridRef}
            className="project-cards-grid mt-6 sm:mt-8 grid grid-cols-1 items-stretch md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 xl:gap-6"
          >
            {projects.map((project, index) => {
              const n = projects.length;
              const isLast = index === n - 1;
              let orphanAlign = "";
              if (isLast && n % 3 === 1) {
                orphanAlign += " xl:col-span-3 xl:w-full xl:max-w-xl xl:justify-self-center";
              }

              const projectBlurb = project.summary ?? project.description ?? "";
              const externalUrl = project.demo_link ?? project.live_demo_link ?? null;
              const isAppStore = typeof externalUrl === "string" && externalUrl.includes("apps.apple.com");

              return (
                <ScrollRevealItem
                  as="article"
                  data-project-card
                  key={project.slug ?? project.name}
                  delay={index * 0.07}
                  y={18}
                  x={index % 2 === 0 ? -8 : 8}
                  className={`${glassPanelClass} hover-lift-card flex h-full min-w-0 flex-col self-stretch${orphanAlign}`}
                  hoverLift={4}
                >
                  <AosBlock delay={Math.min(index * 65, 400)} className="flex h-full min-h-0 w-full flex-1 flex-col">
                  <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-deep">Project</p>
                  <h3 className="mt-2 font-display text-[17px] sm:text-[18px] leading-snug font-semibold text-slate-900 mobile-safe-text break-words">
                    {project.name}
                  </h3>
                  {project.roleLine ? (
                    <p className="mt-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-deep leading-snug break-words">
                      {project.roleLine}
                    </p>
                  ) : null}
                  {project.impactLine ? (
                    <p className="mt-1.5 text-[12px] sm:text-[13px] leading-snug text-slate-700 border-l-2 border-brand-primary/40 pl-2.5 py-0.5 break-words">
                      {project.impactLine}
                    </p>
                  ) : null}
                  {project.preview_video || project.image ? (
                    <div
                      className={`mt-3 h-[136px] shrink-0 overflow-hidden rounded-xl border border-brand-light/80 sm:h-[156px] ${
                        project.preview_video ? "bg-slate-950" : "bg-brand-chip/70"
                      }`}
                    >
                      {project.preview_video ? (
                        <ProjectDemoVideo
                          src={project.preview_video}
                          title={project.name}
                          onLayoutStable={syncProjectCardFloor}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-2 sm:p-2.5">
                          <motion.img
                            src={project.image}
                            alt={project.name}
                            className="max-h-full max-w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                            transition={{ duration: 0.35, ease: motionEase }}
                            onLoad={syncProjectCardFloor}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                  <div className="mt-3 flex min-h-0 flex-1 flex-col">
                    <p className="text-[13px] sm:text-[14px] leading-[1.62] text-slate-600 mobile-safe-text break-words">
                      {projectBlurb}
                    </p>
                    <div className="mt-auto flex flex-col gap-3 pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag.name}
                            className="inline-flex items-center px-2.5 py-1 rounded-full border border-brand-light bg-brand-chip text-brand-deep text-[11px] font-semibold"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col flex-wrap gap-2 xs:flex-row">
                        {externalUrl ? (
                          <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 flex-1 xs:flex-none items-center justify-center px-3 py-2 rounded-xl text-[12px] sm:text-[13px] font-semibold border border-brand-light text-brand-deep bg-white hover:bg-brand-chip transition active:scale-[0.99]"
                          >
                            {isAppStore ? "Download on App Store" : "Live demo"}
                          </a>
                        ) : null}
                        {typeof project.source_code_link === "string" && project.source_code_link.trim() ? (
                          <a
                            href={project.source_code_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 flex-1 xs:flex-none items-center justify-center text-white px-3 py-2 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:opacity-90 transition bg-brand-primary active:scale-[0.99]"
                          >
                            View GitHub
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  </AosBlock>
                </ScrollRevealItem>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
