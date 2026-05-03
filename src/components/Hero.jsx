import { styles } from "../styles";
import PrimaryButton from "./ui/PrimaryButton";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[82vh] mx-auto flex items-center">
      <div className={`${styles.paddingX} w-full max-w-5xl mx-auto py-28 text-center`}>
        <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">
          Portfolio
        </p>
        <h1 className={`${styles.heroHeadText} mt-8 max-w-3xl mx-auto`}>
          It is impossible to imagine what is impossible.
        </h1>
        <p className={`${styles.heroSubText} mt-6 max-w-2xl mx-auto`}>
          Ryan Back · Full-Stack Software Engineer focused on clean interfaces and reliable product delivery.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <PrimaryButton href="#projects">View projects</PrimaryButton>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-white border border-brand-light text-accent px-6 py-3 rounded-xl font-semibold hover:bg-brand-surface transition"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero
