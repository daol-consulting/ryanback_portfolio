import { motion } from "framer-motion";

export default function ScrollProgressBar({ reduceMotion, scrollYProgress }) {
  if (reduceMotion) return null;
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-brand-deep/90 origin-left"
      aria-hidden
      style={{ scaleX: scrollYProgress }}
    />
  );
}
