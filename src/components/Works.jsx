import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { GitBranch } from "lucide-react";
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { projects } from "../content/siteContent";
import { fadeIn, textVariant } from '../utils/motion';
import TagChip from "./ui/TagChip";
import ScrollReveal from "./ui/ScrollReveal";

const ProjectCard = ({ index, name, summary, description, tags, image, source_code_link }) => {
  const narrative = summary ?? description;
  return (
    <ScrollReveal variants={fadeIn("up", "spring", index * 0.15, 0.75)} className="min-w-0">
      <Tilt
        options={{ max: 10, scale: 1.02, speed: 450 }}
          className="bg-white border border-brand-light p-5 rounded-2xl sm:w-[360px] w-full overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        <div className="relative w-full h-[220px] overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          {typeof source_code_link === "string" && source_code_link.trim() ? (
            <div className="absolute inset-0 flex justify-end m-3">
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer shadow-lg"
                aria-label="View source on GitHub"
              >
                <GitBranch className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>

        <div className="mt-5">
          <h3 className={styles.cardTitle}>{name}</h3>
          <p className={`mt-2 ${styles.cardDescription} line-clamp-3`}>{narrative}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <TagChip key={idx} label={tag.name} />
          ))}
        </div>
      </Tilt>
    </ScrollReveal>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className="text-[12px] text-white/70 font-bold uppercase tracking-[0.3em]">Projects</p>
        <h2 className="text-white font-black md:text-[50px] sm:text-[42px] xs:text-[34px] text-[28px] leading-tight mt-1">
          Projects.
        </h2>
        <div className="mx-auto mt-4 h-[2px] w-16 bg-white/20 rounded-full" />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white/75 text-[17px] max-w-3xl leading-[30px] mx-auto text-center"
      >
        Selected projects demonstrating production-grade engineering, clean UI architecture, and real-world impact.
      </motion.p>

      <div className="mt-14 flex flex-wrap justify-center gap-7">
        {projects
          .filter((project) => project.featured !== false && project.slug)
          .map((project, index) => (
            <ProjectCard key={project.slug} index={index} {...project} />
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
