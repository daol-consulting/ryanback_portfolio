/**
 * Scroll-triggered entrance (AOS). Keep motion subtle per DESIGN.md.
 * @param {{ children: import('react').ReactNode; animation?: string; delay?: number; className?: string }} props
 */
export default function AosBlock({ children, animation = "fade-up", delay = 0, className = "" }) {
  return (
    <div className={className} data-aos={animation} data-aos-delay={delay}>
      {children}
    </div>
  );
}
