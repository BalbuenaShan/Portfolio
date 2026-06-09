"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ColorBends from "./ColorBends";
import { MorphingText } from "@/components/ui/liquid-text";
import LocationClock from "./LocationClock";

const letterVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(18px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const animatedLine = (
  text: string,
  delayStart: number,
  controls: any // AnimationControls from framer-motion
) => (
  <span className="inline-flex flex-wrap justify-center">
    {text.split(" ").map((word, wordIndex) => (
      <span className="inline-flex whitespace-nowrap" key={`${word}-${wordIndex}`}>
        {word.split("").map((letter, letterIndex) => {
          const delay = delayStart + (wordIndex * 7 + letterIndex) * 0.05;
          return (
            <motion.span
              key={`${letter}-${letterIndex}`}
              className="inline-block"
              variants={letterVariant}
              initial="hidden"
              animate={controls}
              custom={delay}
            >
              {letter}
            </motion.span>
          );
        })}
        <span className="inline-block w-2" />
      </span>
    ))}
  </span>
);

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25, once: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background text-center"
    >
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#4a2dee"]}
          rotation={146}
          speed={0.25}
          scale={4.5}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.030}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={5}
          transparent
          autoRotate={0}
          color="#5f46e7"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-background/10 dark:bg-[#120a2c]/25" />

      <div className="absolute inset-x-0 bottom-24 z-10 px-6">
        <LocationClock />
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >

        <h1 className="mt-6 text-6xl font-bold leading-tight text-foreground sm:text-7xl md:text-8xl">
          {animatedLine("Create with purpose", 0, controls)}
          <br />
          <span className="text-accent">{animatedLine("Design with meaning", 0.9, controls)}</span>
        </h1>
        <div className="mt-8 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(18px)" }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(18px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 1.6 } },
            }}
            className="mx-auto"
          >
            <MorphingText
              texts={["Frontend Developer", "UI/UX Design", "Graphic Design"]}
              className="mx-auto"
            />
          </motion.div>
        </div>

      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-accent"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
