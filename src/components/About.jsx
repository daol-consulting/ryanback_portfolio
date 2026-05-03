import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion';
import { Blocks, Gauge, Laptop, Sparkles } from "lucide-react";
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";

const serviceIconByTitle = {
  "Frontend Specialist": Laptop,
  "Full-Stack Engineer": Blocks,
  "UI Performance Engineer": Gauge,
  "AI Product Builder": Sparkles,
};

const ServiceCard = ({ index, title }) => {
  const Icon = serviceIconByTitle[title] ?? Laptop;
  return (
    <Tilt className="xs:w-[240px] w-full">
      <ScrollReveal
        variants={fadeIn("right", "spring", 0.15 * index, 0.75)}
        className="w-full p-[1px] rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
        style={{ background: 'linear-gradient(135deg, rgba(15,76,117,0.18), rgba(50,130,184,0.18))' }}
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-white rounded-2xl py-7 px-5 sm:py-8 sm:px-8 md:px-10 min-h-[240px] sm:min-h-[260px] flex justify-evenly items-center flex-col border border-brand-light"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-chip flex items-center justify-center">
            <Icon className="w-9 h-9 text-accent" strokeWidth={2} aria-hidden="true" />
          </div>
          <h3 className="text-accent text-[18px] font-bold text-center leading-snug">{title}</h3>
        </div>
      </ScrollReveal>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <SectionHeading sublabel="About" title="About." />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-5 text-secondary text-[17px] max-w-3xl leading-[32px]"
      >
        Full-Stack Software Engineer with frontend specialization, experienced in building and shipping production-grade applications across ERP systems, B2B platforms, and client-facing web products.
        Strong background in React, TypeScript, and real-time data systems.
        <br /><br />
        I design scalable UI architectures, optimize performance in data-heavy interfaces, and collaborate across product, backend, and QA to deliver reliable software.
        I thrive in fast-paced environments where speed, ownership, and product quality are critical.
      </motion.p>

      <div className="mt-16 flex flex-wrap gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")
