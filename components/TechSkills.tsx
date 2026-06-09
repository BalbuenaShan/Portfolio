"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiFigma,
  SiCanva,
} from "react-icons/si";
import { TbBrandReactNative, TbBrandAdobePhotoshop, TbBrandAdobeIllustrator } from "react-icons/tb";

const skills = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React JS", Icon: SiReact },
  { name: "React Native", Icon: TbBrandReactNative },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Python", Icon: SiPython },
  { name: "Figma", Icon: SiFigma },
  { name: "Photoshop", Icon: TbBrandAdobePhotoshop },
  { name: "Illustrator", Icon: TbBrandAdobeIllustrator },
  { name: "Canva", Icon: SiCanva },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function TechSkills() {
  return (
    <motion.section
      id="skills"
      className="bg-background py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {"Tech Stack and Tools"}
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            The tools I reach for
          </h2>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {skills.map((skill) => {
            const IconComponent = skill.Icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20"
                >
                  <IconComponent className="h-8 w-8 text-accent transition-transform duration-300" />
                </motion.div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-inverse px-3 py-1.5 text-sm font-medium text-inverse-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {skill.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-1.5 w-1.5 -translate-y-0.5 rotate-45 bg-inverse" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
