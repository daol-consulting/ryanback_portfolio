import { motionEase } from "../../lib/siteTokens";

export const skillsStaggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.034, delayChildren: 0.05 },
  },
};

export const skillsStaggerChild = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: motionEase },
  },
};
