import { styles } from "../../styles";

const SectionHeading = ({ sublabel, title }) => {
  return (
    <div className="text-center">
      <p className={styles.sectionSubText}>{sublabel}</p>
      <h2 className={styles.sectionHeadText}>{title}</h2>
      <div className="mx-auto mt-4 h-[2px] w-16 bg-brand-deep/20 rounded-full" />
    </div>
  );
};

export default SectionHeading;

