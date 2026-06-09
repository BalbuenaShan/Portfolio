"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const projects = [
  {
    title: "RiceSure",
    category: "Mobile Application",
    description:
      "A CNN-based biological image processing framework for rice grain purity analysis using enhanced mobile imaging.",
    year: "2025",
    tags: ["React Expo", "TensorFlow", "Flask", "Machine Learning"],
    screenshot: "/RS.jpg",
  },
  {
    title: "Travel Planner",
    category: "Mobile Application",
    description:
      "A small Expo React Native app for adding and managing trips, with data saved through a PHP file system.",
    year: "2025",
    tags: ["Expo React Native", "JavaScript", "PHP"],
    screenshot: "/TP.jpg",
  },
  {
    title: "Emperors Lounge & Barbershop",
    category: "Website Online Booking",
    description:
      "An online booking website for a barbershop and lounge, helping customers schedule appointments, view services, and manage bookings.",
    year: "2024",
    tags: ["React JS", "PHP", "MySQL", "CSS"],
    screenshot: "/EB.png",
  },
];

function ProjectVisual({
  project,
  active,
  onImageClick,
}: {
  project: (typeof projects)[number];
  active: boolean;
  onImageClick: (src: string) => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Expand ${project.title} screenshot`}
      className="absolute inset-0 overflow-hidden rounded-xl text-left shadow-2xl shadow-black/20 dark:shadow-black/50"
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.05 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      onClick={() => onImageClick(project.screenshot)}
    >
      <Image
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#5f46e7]/35 via-transparent to-transparent dark:from-[#2a1556]/55 dark:opacity-90" />
    </motion.button>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previousOverflowRef = useRef("");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const railX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(projects.length - 1) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      projects.length - 1,
      Math.floor(latest * projects.length),
    );

    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [selectedImage]);

  const scrollToProject = (index: number) => {
    if (!sectionRef.current) {
      return;
    }

    const { top, height } = sectionRef.current.getBoundingClientRect();
    const start = window.scrollY + top;
    const availableScroll = height - window.innerHeight;

    window.scrollTo({
      top: start + availableScroll * (index / Math.max(projects.length - 1, 1)),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#5f46e7] text-white dark:bg-[#2a1556]"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 pb-8 pt-24 md:px-12 md:pb-12">
          <motion.div
            className="mx-auto w-full max-w-3xl"
            initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/90">
              {"Projects"}
            </p>
            <h2 className="mb-8 text-center font-coolvetica text-4xl font-bold text-white md:text-5xl">
              Crafted through code and creativity
            </h2>
          </motion.div>

          <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/20 bg-black/5 shadow-2xl shadow-indigo-950/20 md:min-h-[360px] dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
              {projects.map((project, index) => (
                <ProjectVisual
                  key={project.title}
                  project={project}
                  active={index === activeIndex}
                  onImageClick={setSelectedImage}
                />
              ))}
            </div>

            <div className="relative min-h-[340px] md:min-h-[390px] lg:h-full">
              {projects.map((project, index) => {
                const active = index === activeIndex;

                return (
                  <motion.div
                    key={project.title}
                    className="absolute inset-0 flex flex-col justify-center"
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active ? 0 : 20,
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    style={{ pointerEvents: active ? "auto" : "none" }}
                  >
                    <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-white/60 dark:text-white/50">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200 dark:text-amber-100">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mb-5 text-4xl font-bold leading-[0.95] text-white md:text-5xl xl:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mb-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg dark:text-white/80">
                      {project.description}
                    </p>
                    <div className="mb-8 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm tabular-nums text-white/65 dark:text-white/55">
                        {project.year}
                      </span>
                      <span className="text-white/35 dark:text-white/25">.</span>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/85"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {selectedImage ? (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <button
                type="button"
                aria-label="Close expanded screenshot"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
              >
                Close
              </button>
              <div className="relative h-full w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-slate-950/95 shadow-2xl shadow-black/60 dark:border-white/10 dark:bg-slate-950/98">
                <Image
                  src={selectedImage}
                  alt="Expanded project screenshot"
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}

          <div className="relative mt-6 overflow-hidden md:mt-8">
            <motion.div className="flex gap-3" style={{ x: railX }}>
              {projects.map((project, index) => {
                const active = index === activeIndex;
                const progress = active ? "100%" : "0%";

                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => scrollToProject(index)}
                    className={`flex w-full shrink-0 items-center gap-3 text-left transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-30 hover:opacity-70"
                    }`}
                    aria-label={`Show ${project.title}`}
                    aria-current={active ? "true" : undefined}
                  >
                    <span className="w-8 font-mono text-xs tabular-nums text-white/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-white/25 dark:bg-white/15">
                      <motion.span
                        className="absolute inset-y-0 left-0 bg-amber-200 dark:bg-amber-100"
                        animate={{ width: progress }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </span>
                    <span className="max-w-[40%] truncate text-sm font-medium text-white/80 dark:text-white/85">
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
