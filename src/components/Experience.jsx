import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Building2, HeartHandshake, Landmark } from "lucide-react";

import 'react-vertical-timeline-component/style.min.css';

import { experiences } from "../content/siteContent";
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import SectionHeading from "./ui/SectionHeading";
import { styles } from "../styles";
import ScrollReveal from "./ui/ScrollReveal";

function websiteHostnameLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Website";
  }
}

const experienceIconByCompany = {
  "Posy Inc, Calgary, AB": BriefcaseBusiness,
  "Daol Consulting, Calgary, AB": Building2,
  "Canada Revenue Agency (CRA), Calgary, AB": Landmark,
  "Empowered Futures, Calgary, AB": HeartHandshake,
};

const ExperienceCard = ({ experience, index }) => {
  const ExperienceIcon = experienceIconByCompany[experience.company_name] ?? BriefcaseBusiness;

  return (
    <VerticalTimelineElement
    contentStyle={{
      background: '#ffffff',
      color: '#1e293b',
      border: '1px solid #bbe1fa',
      boxShadow: '0px 8px 32px rgba(15, 76, 117, 0.12)',
      borderRadius: '16px',
    }}
    contentArrowStyle={{ borderRight: '7px solid #bbe1fa' }}
    date={experience.date}
    iconStyle={{
      background: experience.iconBg,
      border: '2px solid #bbe1fa',
      boxShadow: '0 0 0 4px #f7fcff',
    }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <ExperienceIcon className="w-[55%] h-[55%] text-accent" strokeWidth={2} aria-hidden="true" />
        </div>
      }
    >
      <ScrollReveal variants={textVariant(index * 0.15)} className="w-full">
        <div>
          <h3 className={styles.cardTitle}>{experience.title}</h3>
          <p className="text-accent text-[14px] font-semibold mt-1" style={{ margin: 0 }}>
            {experience.company_name}
          </p>
          {experience.company_website ? (
            <a
              href={experience.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-[13px] font-semibold underline underline-offset-2 mt-1 inline-block"
            >
              {websiteHostnameLabel(experience.company_website)}
            </a>
          ) : null}
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, pointIndex) => (
            <li
              key={`experience-point-${pointIndex}`}
              className={`pl-1 ${styles.cardListItem}`}
            >
              {point}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </VerticalTimelineElement>
  );
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <SectionHeading sublabel="Experience" title="Experience." />
      </motion.div>

      <div className="mt-16 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "career");
