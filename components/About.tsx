"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="flex min-h-dvh items-center justify-center bg-background py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {"About Me"}
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            I create like I mean it
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p className="leading-relaxed text-justify">
              Hi! I&apos;m Jazrel Shan Kurvy A. Balbuena, a BSIT graduate from Davao City,
              Philippines, and an aspiring Frontend Developer with a strong passion for
              UI/UX design and creative digital experiences. I enjoy building modern,
              responsive, and user-friendly interfaces that combine functionality with
              clean and visually appealing design.
            </p>
            <p className="leading-relaxed text-justify">
              I mainly work with React, Next.js, Tailwind CSS, and Figma, while also
              using Adobe Photoshop to support creative and design-focused projects.
              I&apos;m someone who enjoys exploring new technologies, learning new skills,
              and challenging myself through different types of projects.
            </p>
            <p className="leading-relaxed text-justify">
              As a continuous learner, I&apos;m always looking for opportunities to grow
              both as a developer and designer. My goal is to create meaningful digital
              experiences that are not only visually engaging but also intuitive and
              effective for users.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-surface to-surface-elevated shadow-2xl shadow-black/10 dark:shadow-black/30"
            style={{ width: 400, height: 500 }}
          >
            <Image
              src="/gpic.png"
              alt="Graphic design portrait alternate"
              width={720}
              height={900}
              priority
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            />

            <Image
              src="/me.png"
              alt="Portrait of Jazrel Shan Kurvy Balbuena"
              width={720}
              height={900}
              priority
              className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
