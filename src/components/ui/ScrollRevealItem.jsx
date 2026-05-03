import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const motionComponents = {
  div: motion.div,
  article: motion.article,
  a: motion.a,
  section: motion.section,
};

/**
 * Scroll-linked entrance: fades/slides in when the block enters the viewport.
 * Respects prefers-reduced-motion.
 */
export default function ScrollRevealItem({
  as = "div",
  children,
  className,
  delay = 0,
  y = 26,
  x = 0,
  once = true,
  amount = 0.22,
  margin = "0px 0px -12% 0px",
  hoverLift = 0,
  ...rest
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const Cmp = motionComponents[as] || motion.div;

  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.52, delay, ease },
        },
      }}
      whileHover={hoverLift ? { y: -hoverLift, transition: { duration: 0.2, ease } } : undefined}
      {...rest}
    >
      {children}
    </Cmp>
  );
}
