import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const shellClass =
  "w-full fixed top-0 z-20 transition-all duration-300 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:pb-4";
/** Same horizontal box as main `sectionWrapClass` (max-width + section-pad-x together). */
const barClass =
  "relative w-full max-w-7xl 2xl:max-w-[min(88rem,calc(100vw-4rem))] mx-auto section-pad-x flex justify-between items-center min-h-11 sm:min-h-0";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${shellClass} flex items-stretch ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-nav" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className={`${barClass}`}>
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent]"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="" className="w-9 h-9 object-contain" />
          <p className="text-brand-deep text-[17px] sm:text-[18px] font-bold cursor-pointer flex items-center">
            Ryan&nbsp;
            <span className="hidden xs:inline">&apos;s Portfolio</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row items-center gap-8 md:gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`inline-flex min-h-11 items-center text-[15px] font-medium transition-colors duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                  active === link.title ? "text-brand-deep font-semibold" : "text-secondary hover:text-brand-deep"
                }`}
                onClick={() => setActive(link.title)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden relative flex flex-1 justify-end items-center min-h-11">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-light/80 bg-white/90 text-brand-deep shadow-sm touch-manipulation [-webkit-tap-highlight-color:transparent]"
            aria-expanded={toggle}
            aria-controls="navbar-mobile-panel"
            aria-label={toggle ? "Close menu" : "Open menu"}
            onClick={() => setToggle(!toggle)}
          >
            <img src={toggle ? close : menu} alt="" className="w-6 h-6 object-contain pointer-events-none" />
          </button>

          <div
            id="navbar-mobile-panel"
            className={`${
              toggle ? "flex" : "hidden"
            } absolute top-full right-0 z-10 mt-2 min-w-[min(100%,12.5rem)] flex-col rounded-2xl border border-brand-light bg-white/95 p-4 shadow-card backdrop-blur-md`}
          >
            <ul className="list-none flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`flex min-h-11 items-center rounded-xl px-3 text-[15px] font-medium transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                      active === link.title ? "text-brand-deep font-semibold bg-brand-chip/80" : "text-secondary hover:bg-brand-chip/60 hover:text-brand-deep"
                    }`}
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
