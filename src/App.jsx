import { useCallback, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import { aboutProfile } from "./assets";
import { SectionAurora } from "./components/aceternity/SectionAurora";
import SkillStrengthThemesMobileCarousel, {
  SkillStrengthThemeCard,
} from "./components/SkillStrengthThemesMobileCarousel";
import ScrollRevealItem from "./components/ui/ScrollRevealItem";
import { FadeContent, GlareHover, Magnet } from "./react-bits";
import { skillCategoryGroups, SKILL_GROUP_PILL_SURFACE } from "./constants";
import {
  career,
  certifications,
  connect,
  educations,
  profileAbout,
  profileQuickLinks,
  projects,
  skillStrengthThemes,
  skillsNarrative,
} from "./content/siteContent";

const sectionWrapClass =
  "w-full max-w-7xl 2xl:max-w-[min(88rem,calc(100vw-4rem))] mx-auto section-pad-x py-8 sm:py-12 md:py-16 lg:py-[4.5rem] xl:py-20";
const glassPanelClass =
  "rounded-[22px] border border-brand-light/65 bg-white/90 p-3.5 sm:p-5 md:p-6 shadow-[0_14px_40px_-28px_rgba(15,76,117,0.18)] backdrop-blur-sm transition-colors duration-300 hover:border-brand-primary/38";

const motionEase = [0.22, 1, 0.36, 1];

function ProfileQuickLinks({ className = "" }) {
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

function websiteHostnameLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Website";
  }
}

const skillsStaggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.034, delayChildren: 0.05 },
  },
};

const skillsStaggerChild = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: motionEase },
  },
};

/** Left rule + serif display title — asymmetric, less “boxed template”. */
function EditorialSectionHeading({ kicker, title, light, reverse }) {
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
const pageSections = ["about", "skills", "career", "projects", "contact"];

/** Scroll position offset when jumping to a section (fixed quick nav + breathing room). */
const NAV_SCROLL_OFFSET = 96;
/** Viewport line (px from top): section is “active” once its top crosses this. */
const NAV_ACTIVATION_TOP = 128;

const HERO_INTRO_STACK_LINES = ["Hello,", "My name is Ryan,", "Full-Stack Engineer"];

const HERO_LOOP_LINES = [
  "Something feels off.",
  "That's where I start.",
  HERO_INTRO_STACK_LINES,
  "Find the problem.",
  "Build the fix.",
  HERO_INTRO_STACK_LINES,
];

const App = () => {
  const formRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [heroLineIndex, setHeroLineIndex] = useState(0);
  const [heroTwist, setHeroTwist] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navDepth, setNavDepth] = useState(0);
  const [careerPanelOpen, setCareerPanelOpen] = useState(() => {
    const initial = {};
    career.forEach((e) => {
      initial[e.company_name] = e.company_name === "Posy Inc";
    });
    return initial;
  });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const navigateToSection = useCallback((id, { instant = false } = {}) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: instant ? "auto" : "smooth" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      /* file:// or restricted environments */
    }
  }, []);

  const updateActiveSectionFromScroll = useCallback(() => {
    let next = pageSections[0];
    for (const id of pageSections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= NAV_ACTIVATION_TOP) next = id;
    }
    const doc = document.documentElement;
    const nearEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 8;
    if (nearEnd) next = pageSections[pageSections.length - 1];
    setActiveSection((p) => (p === next ? p : next));
  }, []);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (pageSections.includes(raw)) {
      requestAnimationFrame(() => navigateToSection(raw, { instant: true }));
    }
  }, [navigateToSection]);

  useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (pageSections.includes(raw)) navigateToSection(raw, { instant: true });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [navigateToSection]);

  useEffect(() => {
    setHeroTwist(false);

    const twistStartTimer = window.setTimeout(() => {
      setHeroTwist(true);
    }, 1400);

    const twistEndTimer = window.setTimeout(() => {
      setHeroTwist(false);
    }, 2500);

    const dwell = Array.isArray(HERO_LOOP_LINES[heroLineIndex]) ? 3600 : 2800;
    const nextLineTimer = window.setTimeout(() => {
      setHeroLineIndex((i) => (i + 1) % HERO_LOOP_LINES.length);
    }, dwell);

    return () => {
      window.clearTimeout(twistStartTimer);
      window.clearTimeout(twistEndTimer);
      window.clearTimeout(nextLineTimer);
    };
  }, [heroLineIndex]);

  useEffect(() => {
    let rafId = null;
    const pending = { y: 0 };

    const flush = () => {
      rafId = null;
      const y = pending.y;
      const wasY = lastScrollYRef.current;
      const delta = y - wasY;
      const isScrollingUp = delta < -2;
      const isScrollingDown = delta > 2;

      const nextDepth = y > 360 ? 2 : y > 120 ? 1 : 0;
      setNavDepth((d) => (d === nextDepth ? d : nextDepth));

      if (y <= 20) {
        setShowQuickNav(false);
      } else if (y <= 120) {
        setShowQuickNav(true);
      } else {
        setShowQuickNav((prev) => {
          if (isScrollingDown) return true;
          if (isScrollingUp) return false;
          return prev;
        });
      }

      updateActiveSectionFromScroll();

      const nextScrollTop = y > 360;
      setShowScrollTop((prev) => (prev === nextScrollTop ? prev : nextScrollTop));

      lastScrollYRef.current = y;
    };

    const handleScroll = () => {
      pending.y = window.scrollY;
      if (rafId == null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    pending.y = window.scrollY;
    flush();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [updateActiveSectionFromScroll]);

  const renderAnimatedText = (
    text,
    lineKey,
    startDelay = 0,
    isTwisting = false,
    twistIndexOffset = 0
  ) => (
    <span key={lineKey}>
      {text.split("").map((char, index) => (
        <span
          key={`${lineKey}-${index}`}
          className={`intro-char ${char === " " ? "intro-char-space" : ""} ${isTwisting ? "is-twisting" : ""}`}
          style={{
            animationDelay: `${startDelay + index * 0.035}s`,
            "--twist-delay": `${(twistIndexOffset + index) * 0.05}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  const currentHeroSlide = HERO_LOOP_LINES[heroLineIndex];
  const heroIsIntroStack = Array.isArray(currentHeroSlide);
  const heroStackLines = heroIsIntroStack ? currentHeroSlide : [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_r8u88rh",
        "template_w48411q",
        {
          from_name: form.name,
          to_name: "Ryan",
          from_email: form.email,
          to_email: "ho0405@gmail.com",
          message: form.message,
        },
        "YGD7ObpQZ8kUMd6ad"
      )
      .then(() => {
        setLoading(false);
        alert("Thanks for reaching out. I will get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to send your message. Please try again shortly.");
      });
  };

  return (
    <>
      {!reduceMotion ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-brand-deep/90 origin-left"
          aria-hidden
          style={{ scaleX: scrollYProgress }}
        />
      ) : null}
      <div
        className={`fixed top-[max(0.75rem,env(safe-area-inset-top))] left-0 right-0 z-40 pointer-events-none transition-all duration-300 ${
          showQuickNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        {/* Match `sectionWrapClass` horizontal shell: max-width + section-pad-x on one node (same as main sections). */}
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
      <section className="intro-hero intro-hero--pinned" aria-live="polite">
        <div className="intro-hero-main">
          <p className="intro-loader-label">Portfolio</p>
          <div className="intro-hero-title-track">
            <h1
              className={`intro-loader-title intro-hero-line${heroIsIntroStack ? " intro-hero-line--stack" : ""}`}
            >
              {heroIsIntroStack ? (
                <span className="intro-hero-stack">
                  {heroStackLines.map((line, index) => {
                    const previousChars = heroStackLines
                      .slice(0, index)
                      .reduce((sum, current) => sum + current.length, 0);
                    const lineStartDelay = previousChars * 0.035 + index * 0.14;

                    return (
                      <span key={`${heroLineIndex}-stack-${index}`} className="intro-hero-stack-row">
                        {renderAnimatedText(
                          line,
                          `${heroLineIndex}-intro-${index}`,
                          lineStartDelay,
                          heroTwist,
                          previousChars
                        )}
                      </span>
                    );
                  })}
                </span>
              ) : (
                renderAnimatedText(currentHeroSlide, heroLineIndex, 0, heroTwist)
              )}
            </h1>
          </div>
          <div className="intro-loader-line" />
        </div>
        <div className="intro-hero-scroll-anchor">
          <Magnet padding={80} magnetStrength={4}>
            <a href="#about" className="intro-scroll-indicator" aria-label="Scroll to About section">
              <span className="intro-scroll-mouse">
                <span className="intro-scroll-dot" />
              </span>
              <span className="intro-scroll-text">SCROLL</span>
            </a>
          </Magnet>
        </div>
      </section>

      <main className="main-over-hero min-w-0 w-full max-w-[100vw] text-slate-900">
        <div className="hero-scroll-spacer" aria-hidden />
      <section id="about" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden rounded-t-3xl md:rounded-t-[2rem]">
        <SectionAurora tone="surface" />
        <div className={`${sectionWrapClass} relative z-10`}>
          <FadeContent duration={900} threshold={0.15} className="w-full">
            <EditorialSectionHeading kicker="Profile" title="About" />
            <ProfileQuickLinks className="mt-4 sm:mt-5" />
            <div className="relative mt-6 md:mt-10 flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-10 xl:gap-11 md:justify-between">
              {/* Portrait: stay in-flow columns on md+ (no viewport bleed — avoids overlapping body copy) */}
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
                    <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-brand-deep">
                      Education
                    </p>
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
            </div>
          </FadeContent>
        </div>
      </section>

      <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-light relative overflow-x-clip overflow-y-visible">
        <SectionAurora tone="light" />
        <div className={`${sectionWrapClass} relative z-10`}>
          <FadeContent duration={800} threshold={0.12} className="w-full min-w-0">
            <EditorialSectionHeading kicker="Toolkit" title="Skills" reverse />
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
            {reduceMotion ? (
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
                            SKILL_GROUP_PILL_SURFACE[group.id] ??
                            "border-brand-light/75 bg-brand-chip/90"
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
            ) : (
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
                            SKILL_GROUP_PILL_SURFACE[group.id] ??
                            "border-brand-light/75 bg-brand-chip/90"
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
            )}
          </FadeContent>
        </div>
      </section>

      <section id="career" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden text-slate-900">
        <SectionAurora tone="surface" />
        <div className={`${sectionWrapClass} relative z-10`}>
          <FadeContent duration={900} threshold={0.15} className="w-full min-w-0">
            {/* Mirror Skills asymmetry: Skills uses lg:ml-auto (inset from left); Career uses lg:mr-auto (inset from right). */}
            <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-0 lg:mr-auto">
              <EditorialSectionHeading kicker="Experience" title="Career" />
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
                  {/* Mobile: compact row — logo + text block + chevron; website as pill below (sm:hidden) */}
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

                  {/* Desktop: unchanged layout */}
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
                          <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary/70 ring-2 ring-brand-light" aria-hidden />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mobile-safe-text">
                              {project.title}
                            </h4>
                            <p className="mt-1 text-[12px] sm:text-[13px] leading-[1.65] text-slate-600 mobile-safe-text">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollRevealItem>
                );
              })}
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface-alt relative overflow-hidden">
        <SectionAurora tone="surfaceAlt" />
        <div className={`${sectionWrapClass} relative z-10`}>
          {/* Align with Skills: inset from the left on large screens (lg:ml-auto). */}
          <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
            <EditorialSectionHeading kicker="Selected work" title="Projects" reverse />
            <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 xl:gap-6">
            {projects.map((project, index) => {
              const n = projects.length;
              const isLast = index === n - 1;
              let orphanAlign = "";
              if (isLast && n % 2 === 1) {
                orphanAlign +=
                  " md:col-span-2 md:w-full md:max-w-2xl md:justify-self-center";
              }
              if (isLast && n % 3 === 1) {
                orphanAlign +=
                  " xl:col-span-3 xl:w-full xl:max-w-xl xl:justify-self-center";
              }

              const projectBlurb = project.summary ?? project.description ?? "";
              const externalUrl = project.demo_link ?? project.live_demo_link ?? null;
              const isAppStore = typeof externalUrl === "string" && externalUrl.includes("apps.apple.com");

              return (
              <ScrollRevealItem
                as="article"
                key={project.slug ?? project.name}
                delay={index * 0.07}
                y={18}
                x={index % 2 === 0 ? -8 : 8}
                className={`${glassPanelClass} hover-lift-card min-w-0${orphanAlign}`}
                hoverLift={4}
              >
                <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-deep">
                  Project
                </p>
                <h3 className="mt-2 font-display text-[17px] sm:text-[18px] leading-snug font-semibold text-slate-900 mobile-safe-text break-words">
                  {project.name}
                </h3>
                {project.roleLine ? (
                  <p className="mt-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-deep leading-snug">
                    {project.roleLine}
                  </p>
                ) : null}
                {project.impactLine ? (
                  <p className="mt-1.5 text-[12px] sm:text-[13px] leading-snug text-slate-700 border-l-2 border-brand-primary/40 pl-2.5 py-0.5">
                    {project.impactLine}
                  </p>
                ) : null}
                {project.image ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-brand-light/80">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-[min(140px,36vw)] min-h-[120px] sm:h-[150px] sm:min-h-0 object-cover"
                      loading="lazy"
                      decoding="async"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      transition={{ duration: 0.35, ease: motionEase }}
                    />
                  </div>
                ) : null}
                <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.62] text-slate-600 mobile-safe-text">{projectBlurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="inline-flex items-center px-2.5 py-1 rounded-full border border-brand-light bg-brand-chip text-brand-deep text-[11px] font-semibold"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <div className="mt-3.5 flex flex-col xs:flex-row flex-wrap gap-2">
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
              </ScrollRevealItem>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden pb-[max(1.75rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))]"
      >
        <SectionAurora tone="surface" />
        <div className={`${sectionWrapClass} relative z-10`}>
          {/* Align with Career: inset from the right on large screens (lg:mr-auto). */}
          <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-0 lg:mr-auto">
            <EditorialSectionHeading kicker="Reach out" title="Contact" />
            <ProfileQuickLinks className="mt-4 sm:mt-5 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 justify-center md:justify-center lg:justify-start" />
            <div className="mt-6 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {connect.map((item, index) => (
              <ScrollRevealItem
                as="a"
                key={item.socialLink}
                href={item.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                delay={index * 0.07}
                className={`${glassPanelClass} hover-lift-card block min-w-0 touch-manipulation [-webkit-tap-highlight-color:transparent]`}
                hoverLift={3}
              >
                <p className="text-[12px] tracking-[0.16em] uppercase font-semibold text-brand-deep">{item.company}</p>
                <p className="mt-2 text-[15px] sm:text-[16px] font-bold text-slate-900 break-words">
                  {item.omitHandlePrefix ? item.name : `@${item.name}`}
                </p>
                <p className="mt-2 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mobile-safe-text">{item.connect}</p>
              </ScrollRevealItem>
            ))}
          </div>

          <FadeContent duration={800} threshold={0.14} className="mt-5 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 block">
          <ScrollRevealItem y={16} amount={0.2} className="block">
            <GlareHover
              className="rounded-[24px]"
              borderRadius="24px"
              background="rgba(255,255,255,0.92)"
              borderColor="rgba(187, 225, 250, 0.7)"
              glareOpacity={0.32}
              glareColor="#dbe7ff"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 p-5 sm:p-6 bg-transparent">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full min-h-11 border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none ring-0 focus:border-brand-primary/50 transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full min-h-11 border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none focus:border-brand-primary/50 transition-colors"
                  required
                />
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="w-full min-h-[6.5rem] border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none resize-y focus:border-brand-primary/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center text-white px-5 py-2.5 rounded-xl text-base sm:text-sm font-semibold hover:opacity-90 transition bg-brand-deep active:scale-[0.99] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </GlareHover>
          </ScrollRevealItem>
          </FadeContent>

            <div className="mt-4 px-2 text-center lg:text-left text-[12px] sm:text-[13px] leading-snug text-slate-500 mobile-safe-text">
              Certifications: {certifications.map((cert) => cert.name).join(" · ")}
            </div>
          </div>
        </div>
      </section>
      </main>
      {showScrollTop ? <ScrollToTopButton reduceMotion={!!reduceMotion} /> : null}
    </>
  );
};

export default App;
