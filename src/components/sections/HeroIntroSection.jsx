import { Magnet } from "../../react-bits";
import { HERO_LOOP_LINES } from "../../content/heroCopy";
import AosBlock from "../ui/AosBlock";

function renderAnimatedText(text, lineKey, startDelay = 0, isTwisting = false, twistIndexOffset = 0) {
  return (
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
}

export default function HeroIntroSection({ heroLineIndex, heroTwist }) {
  const currentHeroSlide = HERO_LOOP_LINES[heroLineIndex];
  const heroIsIntroStack = Array.isArray(currentHeroSlide);
  const heroStackLines = heroIsIntroStack ? currentHeroSlide : [];

  return (
    <section className="intro-hero intro-hero--pinned" aria-live="polite">
      <AosBlock animation="fade-up" className="intro-hero-main">
        <p className="intro-loader-label">Portfolio</p>
        <div className="intro-hero-title-track">
          <h1 className={`intro-loader-title intro-hero-line${heroIsIntroStack ? " intro-hero-line--stack" : ""}`}>
            {heroIsIntroStack ? (
              <span className="intro-hero-stack">
                {heroStackLines.map((line, index) => {
                  const previousChars = heroStackLines.slice(0, index).reduce((sum, current) => sum + current.length, 0);
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
      </AosBlock>
      <AosBlock animation="fade-up" delay={120} className="intro-hero-scroll-anchor">
        <Magnet padding={80} magnetStrength={4}>
          <a href="#about" className="intro-scroll-indicator" aria-label="Scroll to About section">
            <span className="intro-scroll-mouse">
              <span className="intro-scroll-dot" />
            </span>
            <span className="intro-scroll-text">SCROLL</span>
          </a>
        </Magnet>
      </AosBlock>
    </section>
  );
}
