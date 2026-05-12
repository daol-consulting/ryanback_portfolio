import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { SectionAurora } from "../aceternity/SectionAurora";
import ScrollRevealItem from "../ui/ScrollRevealItem";
import { FadeContent, GlareHover } from "../../react-bits";
import { certifications, connect } from "../../content/siteContent";
import EditorialSectionHeading from "../site/EditorialSectionHeading";
import ProfileQuickLinks from "../site/ProfileQuickLinks";
import AosBlock from "../ui/AosBlock";
import { glassPanelClass, sectionWrapClass } from "../../lib/siteTokens";
import { refreshAos } from "../../utils/aosRefresh";

export default function ContactSection() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshAos();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_r8u88rh",
        "template_w48411q",
        {
          from_name: form.name,
          to_name: "Ryan",
          from_email: form.email,
          to_email: "ho0405@gmail.com",
          message: form.message,
        },
        "YGD7ObpQZ8kUMd6ad"
      )
      .then(() => {
        setLoading(false);
        alert("Thanks for reaching out. I will get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to send your message. Please try again shortly.");
      });
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 sm:scroll-mt-24 bg-brand-surface relative overflow-hidden pb-[max(1.75rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))]"
    >
      <SectionAurora tone="surface" />
      <div className={`${sectionWrapClass} relative z-10`}>
        <div className="max-w-full xl:max-w-6xl w-full min-w-0 mx-auto lg:mx-0 lg:ml-0 lg:mr-auto">
          <AosBlock>
            <EditorialSectionHeading kicker="Reach out" title="Contact" />
            <ProfileQuickLinks className="mt-4 sm:mt-5 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 justify-center md:justify-center lg:justify-start" />
          </AosBlock>
          <AosBlock delay={60} className="mt-6 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {connect.map((item, index) => (
              <ScrollRevealItem
                as="a"
                key={item.socialLink}
                href={item.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                delay={index * 0.07}
                className={`${glassPanelClass} hover-lift-card block min-w-0 touch-manipulation [-webkit-tap-highlight-color:transparent]`}
                hoverLift={3}
              >
                <p className="text-[12px] tracking-[0.16em] uppercase font-semibold text-brand-deep">{item.company}</p>
                <p className="mt-2 text-[15px] sm:text-[16px] font-bold text-slate-900 break-words">
                  {item.omitHandlePrefix ? item.name : `@${item.name}`}
                </p>
                <p className="mt-2 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mobile-safe-text">{item.connect}</p>
              </ScrollRevealItem>
            ))}
          </AosBlock>

          <AosBlock delay={100}>
          <FadeContent duration={800} threshold={0.14} className="mt-5 max-w-4xl xl:max-w-5xl w-full mx-auto lg:mx-0 block">
            <ScrollRevealItem y={16} amount={0.2} className="block">
              <GlareHover
                className="rounded-[24px]"
                borderRadius="24px"
                background="rgba(255,255,255,0.92)"
                borderColor="rgba(187, 225, 250, 0.7)"
                glareOpacity={0.32}
                glareColor="#dbe7ff"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 p-5 sm:p-6 bg-transparent">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full min-h-11 border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none ring-0 focus:border-brand-primary/50 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full min-h-11 border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none focus:border-brand-primary/50 transition-colors"
                    required
                  />
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full min-h-[6.5rem] border border-brand-light/80 bg-brand-chip/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm outline-none resize-y focus:border-brand-primary/50 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center text-white px-5 py-2.5 rounded-xl text-base sm:text-sm font-semibold hover:opacity-90 transition bg-brand-deep active:scale-[0.99] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </form>
              </GlareHover>
            </ScrollRevealItem>
          </FadeContent>
          </AosBlock>

          <AosBlock delay={40} animation="fade-up" className="mt-4 px-2 text-center lg:text-left text-[12px] sm:text-[13px] leading-snug text-slate-500 mobile-safe-text">
            Certifications: {certifications.map((cert) => cert.name).join(" · ")}
          </AosBlock>
        </div>
      </div>
    </section>
  );
}
