import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * Scroll-based reveal.
 * - Triggers once when the element enters the viewport.
 * - Uses Framer Motion variants (expects `hidden` / `show` keys).
 */
const ScrollReveal = ({
  children,
  className = "",
  variants,
  once = true,
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
  ...rest
}) => {
  const ref = useRef(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        controls.start("show");
        if (once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, once, threshold, rootMargin]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

