import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionAurora } from "../aceternity/SectionAurora";
import ScrollRevealItem from "../ui/ScrollRevealItem";
import { FadeContent } from "../../react-bits";
import { career } from "../../content/siteContent";
import EditorialSectionHeading from "../site/EditorialSectionHeading";
import AosBlock from "../ui/AosBlock";
import { glassPanelClass, sectionWrapClass } from "../../lib/siteTokens";
import { refreshAos } from "../../utils/aosRefresh";
import { websiteHostnameLabel } from "../../utils/websiteHostname";

export default function CareerSection() {
  const [careerPanelOpen, setCareerPanelOpen] = useState(() => {
    const initial = {};
    career.forEach((e) => {
      initial[e.company_name] = e.company_name === "Posy Inc";
    });
    return initial;
  });

  useEffect(() => {
    refreshAos();
  }, []);

  return (
    <section id="career" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden text-slate-900">
      <SectionAurora tone="surface" />
      <div className={`${sectionWrapClass} relative z-10`}>
        <FadeContent duration={900} threshold={0.15} className="w-full min-w-0">
          <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-0 lg:mr-auto">
            <AosBlock>
              <EditorialSectionHeading kicker="Experience" title="Career" />
            </AosBlock>
            <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
              {career.map((entry, index) => {
                const detailId = `career-details-${index}`;
                const isExpanded = careerPanelOpen[entry.company_name] === true;

                return (
                  <ScrollRevealItem
                    as="article"
                    key={`${entry.company_name}-${entry.period}`}
                    delay={index * 0.06}
                    y={24}
                    className={`${glassPanelClass} hover-lift-card relative overflow-hidden`}
                  >
                    <AosBlock delay={Math.min(index * 75, 300)} className="block">
                    <div className="relative z-10 sm:hidden">
                      <div className="flex items-start gap-3">
                        <div
                          className="shrink-0 flex items-center justify-center overflow-hidden rounded-2xl border border-brand-light/90 shadow-[0_6px_20px_-14px_rgba(15,76,117,0.22)] size-[52px] p-1.5"
                          style={{ backgroundColor: entry.logo_bg ?? "#ffffff" }}
                        >
                          {entry.logo ? (
                            <img
                              src={entry.logo}
                              alt={`${entry.company_name} logo`}
                              className={[
                                "block h-auto w-auto max-h-full max-w-full object-contain object-center shrink-0",
                                entry.invert_logo_for_light_bg ? "invert" : "",
                              ]
                                .join(" ")
                                .trim()}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="truncate px-0.5 text-center text-[11px] font-bold leading-tight text-brand-deep">
                              {entry.logo_letter}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-[15px] font-bold tracking-tight text-slate-900 leading-snug mobile-safe-text break-words">
                                {entry.company_name}
                              </h3>
                              <p className="mt-0.5 text-[11px] text-slate-400 font-medium tabular-nums">{entry.period}</p>
                              <p className="mt-1.5 text-[12px] font-semibold text-brand-deep/90 leading-snug mobile-safe-text">
                                {entry.role_title}
                              </p>
                            </div>
                            <button
                              type="button"
                              id={`${detailId}-toggle-mobile`}
                              aria-expanded={isExpanded}
                              aria-controls={detailId}
                              onClick={() =>
                                setCareerPanelOpen((prev) => ({
                                  ...prev,
                                  [entry.company_name]: !prev[entry.company_name],
                                }))
                              }
                              className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-light bg-white text-brand-deep shadow-[0_1px_0_rgba(15,76,117,0.06)] active:bg-brand-chip transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                            >
                              <span className="sr-only">
                                {isExpanded ? "Collapse role details" : "Expand role details"}
                              </span>
                              <ChevronDown
                                className={`size-[1.125rem] shrink-0 text-brand-deep transition-transform duration-200 ease-out ${isExpanded ? "rotate-180" : ""}`}
                                aria-hidden
                              />
                            </button>
                          </div>
                          {entry.company_website ? (
                            <a
                              href={entry.company_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2.5 inline-flex max-w-full items-center rounded-full border border-brand-light/90 bg-brand-chip/90 px-2.5 py-1.5 text-[11px] font-semibold text-brand-deep hover:border-brand-primary/35 hover:bg-white transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                            >
                              <span className="truncate">{websiteHostnameLabel(entry.company_website)}</span>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 hidden sm:flex sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex w-full shrink-0 justify-center sm:justify-start sm:w-[100px]">
                        <div
                          className="shrink-0 flex items-center justify-center overflow-hidden rounded-full border border-brand-light/80 shadow-[0_10px_36px_-16px_rgba(15,76,117,0.18)] aspect-square size-[84px] sm:size-[96px] p-2.5 sm:p-3"
                          style={{ backgroundColor: entry.logo_bg ?? "#ffffff" }}
                        >
                          {entry.logo ? (
                            <img
                              src={entry.logo}
                              alt={`${entry.company_name} logo`}
                              className={[
                                "block h-auto w-auto max-h-full max-w-full object-contain object-center shrink-0",
                                entry.invert_logo_for_light_bg ? "invert" : "",
                              ]
                                .join(" ")
                                .trim()}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="truncate px-0.5 text-center text-[12px] font-bold leading-tight text-brand-deep sm:text-[13px]">
                              {entry.logo_letter}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 sm:justify-between">
                          <h3 className="text-[16px] sm:text-[19px] font-bold tracking-tight text-slate-900 leading-tight mobile-safe-text break-words w-full sm:w-auto sm:min-w-0 sm:flex-1">
                            {entry.company_name}
                          </h3>
                          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                            {entry.company_website ? (
                              <a
                                href={entry.company_website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center text-[12px] font-semibold text-brand-deep underline underline-offset-2 hover:text-brand-primary transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                              >
                                {websiteHostnameLabel(entry.company_website)}
                              </a>
                            ) : null}
                            <button
                              type="button"
                              id={`${detailId}-toggle`}
                              aria-expanded={isExpanded}
                              aria-controls={detailId}
                              onClick={() =>
                                setCareerPanelOpen((prev) => ({
                                  ...prev,
                                  [entry.company_name]: !prev[entry.company_name],
                                }))
                              }
                              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-light bg-white/90 text-brand-deep hover:bg-brand-chip hover:border-brand-primary/35 transition-colors active:scale-[0.98] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                            >
                              <span className="sr-only">
                                {isExpanded ? "Collapse role details" : "Expand role details"}
                              </span>
                              <ChevronDown
                                className={`size-5 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                aria-hidden
                              />
                            </button>
                          </div>
                        </div>
                        <p className="mt-0.5 text-[11px] sm:text-[12px] text-slate-400 font-medium">{entry.period}</p>
                        <p className="mt-1 text-[13px] sm:text-[14px] font-semibold text-brand-deep/90">{entry.role_title}</p>
                      </div>
                    </div>

                    <div
                      id={detailId}
                      hidden={!isExpanded}
                      className="relative z-10 mt-3 border-t border-brand-light/50 pt-4 sm:mt-0 sm:border-t-0 sm:pt-0"
                    >
                      <p className="mt-0 text-[13px] sm:text-[14px] sm:mt-4 leading-[1.7] text-slate-600 mobile-safe-text">
                        {entry.tagline}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-brand-chip border border-brand-light px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-brand-deep tracking-[0.06em] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-5 border-t border-brand-light/50 space-y-4">
                        {entry.projects.map((project) => (
                          <div key={project.title} className="flex gap-2.5 sm:gap-3">
                            <div
                              className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary/70 ring-2 ring-brand-light"
                              aria-hidden
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mobile-safe-text">{project.title}</h4>
                              <p className="mt-1 text-[12px] sm:text-[13px] leading-[1.65] text-slate-600 mobile-safe-text">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </AosBlock>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
