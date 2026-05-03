import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Subtle vertical drift tied to scroll position through the element’s viewport range.
 */
export default function ParallaxFloat({ children, className, innerClassName = "", yRange = 20 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-yRange * 0.4, yRange * 0.4]);

  if (reduced) {
    return (
      <div className={className}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
