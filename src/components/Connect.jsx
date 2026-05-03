import { motion } from 'framer-motion';
import { BriefcaseBusiness, GitBranch } from 'lucide-react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { connect } from "../content/siteContent";
import SectionHeading from "./ui/SectionHeading";
import ContentCard from "./ui/ContentCard";
import ScrollReveal from "./ui/ScrollReveal";

const SocialIcon = ({ socialLink }) => {
  const iconClass = "w-9 h-9 text-accent cursor-pointer hover:opacity-70 transition-opacity";
  if (socialLink.includes('github')) return <GitBranch className={iconClass} strokeWidth={2} />;
  if (socialLink.includes('linkedin')) return <BriefcaseBusiness className={iconClass} strokeWidth={2} />;
  return null;
};

const ConnectCard = ({ index, connect, name, company, socialLink }) => (
  <ScrollReveal variants={fadeIn("", "spring", index * 0.15, 0.75)}>
    <ContentCard className="p-8 xs:w-[320px] w-full hover:shadow-card-hover transition-all duration-300">
      <p className="text-accent font-bold text-[24px] leading-none">•</p>

      <div className="mt-2">
        <p className={`${styles.cardDescription} tracking-wide`}>{connect}</p>
        <div className="mt-6 flex justify-between items-center gap-1 border-t border-brand-light pt-5">
          <div className="flex-1 flex flex-col">
            <p className="text-slate-900 font-semibold text-[15px]">
              <span className="text-accent">@</span> {name}
            </p>
            <p className={`mt-0.5 ${styles.cardListItem}`}>on {company}</p>
          </div>
          <a href={socialLink} target="_blank" rel="noopener noreferrer">
            <SocialIcon socialLink={socialLink} />
          </a>
        </div>
      </div>
    </ContentCard>
  </ScrollReveal>
);

const Connect = () => {
  return (
    <div className="mt-6">
      <div className="min-h-[120px]">
        <motion.div variants={textVariant()}>
          <SectionHeading sublabel="Connect" title="Connect." />
        </motion.div>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-7">
        {connect.map((item, index) => (
          <ConnectCard key={item.name} index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Connect, "connect");
