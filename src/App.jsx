import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import AboutSection from "./components/sections/AboutSection";
import HeroIntroSection from "./components/sections/HeroIntroSection";
import QuickNavBar from "./components/sections/QuickNavBar";
import ScrollProgressBar from "./components/sections/ScrollProgressBar";
import { HERO_LOOP_LINES } from "./content/heroCopy";
import { useAos } from "./hooks/useAos";
import { NAV_ACTIVATION_TOP, NAV_SCROLL_OFFSET, pageSections } from "./lib/siteTokens";

const SkillsSection = lazy(() => import("./components/sections/SkillsSection"));
const CareerSection = lazy(() => import("./components/sections/CareerSection"));
const ProjectsSection = lazy(() => import("./components/sections/ProjectsSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));

function SectionFallback() {
  return <div className="min-h-[12rem] w-full" aria-hidden />;
}

const App = () => {
  const lastScrollYRef = useRef(0);
  const [heroLineIndex, setHeroLineIndex] = useState(0);
  const [heroTwist, setHeroTwist] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navDepth, setNavDepth] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  useAos(!!reduceMotion);

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

  return (
    <>
      <ScrollProgressBar reduceMotion={reduceMotion} scrollYProgress={scrollYProgress} />
      <QuickNavBar
        showQuickNav={showQuickNav}
        navDepth={navDepth}
        activeSection={activeSection}
        reduceMotion={reduceMotion}
        navigateToSection={navigateToSection}
      />
      <HeroIntroSection heroLineIndex={heroLineIndex} heroTwist={heroTwist} />

      <main className="main-over-hero min-w-0 w-full max-w-[100vw] text-slate-900">
        <div className="hero-scroll-spacer" aria-hidden />
        <AboutSection />
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CareerSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      {showScrollTop ? <ScrollToTopButton reduceMotion={!!reduceMotion} /> : null}
    </>
  );
};

export default App;
