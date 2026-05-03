import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { styles } from "../styles";
import PrimaryButton from "./ui/PrimaryButton";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const template_id = "template_w48411q";
  const service_id = "service_r8u88rh";
  const public_key = "YGD7ObpQZ8kUMd6ad";
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      service_id,
      template_id,
      {
        from_name: form.name,
        to_name: "Ryan",
        from_email: form.email,
        to_email: "ho0405@gmail.com",
        message: form.message,
      },
      public_key
    ).then(() => {
      setLoading(false);
      alert("Thank you! I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    }, (err) => {
      setLoading(false);
      console.log(err);
      alert("Something went wrong. Please try again later.");
    });
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-white border border-brand-light p-8 rounded-2xl shadow-card"
      >
        <p className={styles.sectionSubText}>Contact</p>
        <h3 className={`${styles.sectionHeadText} mt-1`}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-slate-900 font-semibold text-[14px] tracking-wide">Your Name</span>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-brand-chip border border-brand-light py-3.5 px-5 placeholder:text-secondary/60 text-slate-900 rounded-xl outline-none focus:border-accent transition-colors text-[15px]"
              value={form.name}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-slate-900 font-semibold text-[14px] tracking-wide">Your Email</span>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-brand-chip border border-brand-light py-3.5 px-5 placeholder:text-secondary/60 text-slate-900 rounded-xl outline-none focus:border-accent transition-colors text-[15px]"
              value={form.email}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-slate-900 font-semibold text-[14px] tracking-wide">Message</span>
            <textarea
              rows={5}
              name="message"
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="bg-brand-chip border border-brand-light py-3.5 px-5 placeholder:text-secondary/60 text-slate-900 rounded-xl outline-none focus:border-accent transition-colors resize-none text-[15px]"
              value={form.message}
            />
          </label>

          <PrimaryButton type="submit">
            {loading ? "Sending..." : "Send Message"}
          </PrimaryButton>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1"
      >
        <div className="h-full bg-white border border-brand-light rounded-2xl shadow-card p-8 flex flex-col justify-between">
          <div>
            <p className="text-accent text-[13px] font-semibold tracking-[0.14em] uppercase">
              Collaboration
            </p>
            <h4 className="mt-2 text-slate-900 text-[24px] font-bold leading-tight">
              Let&apos;s build something reliable.
            </h4>
            <p className="mt-4 text-secondary text-[15px] leading-7">
              I focus on maintainable frontend architecture, predictable state management,
              and practical performance improvements for production products.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-light space-y-3 text-[14px] text-slate-700">
            <p>Response time: typically within 1-2 business days</p>
            <p>Preferred stack: React, TypeScript, modern web tooling</p>
            <p>Location: open to remote collaboration</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
