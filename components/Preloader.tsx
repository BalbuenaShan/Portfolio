"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EXIT_DURATION = 1300;

export default function Preloader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const previousOverflowRef = useRef("");

  useEffect(() => {
    previousOverflowRef.current = document.body.style.overflow;
    let exitTimer: number | undefined;
    let loadDelayTimer: number | undefined;

    const beginExit = () => {
      setIsLeaving(true);
      exitTimer = window.setTimeout(() => {
        setShouldRender(false);
      }, EXIT_DURATION);
    };

    const handleLoad = () => {
      loadDelayTimer = window.setTimeout(beginExit, 120);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("load", handleLoad);
      if (loadDelayTimer) {
        window.clearTimeout(loadDelayTimer);
      }
      if (exitTimer) {
        window.clearTimeout(exitTimer);
      }
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      document.body.style.overflow = previousOverflowRef.current;
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      aria-hidden={isLeaving}
      className={[
        "fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-background",
        "transition-opacity duration-500 ease-out",
        isLeaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(95,70,231,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(250,249,255,0.96))] dark:bg-[radial-gradient(circle_at_center,rgba(107,70,193,0.28),transparent_42%),linear-gradient(180deg,rgba(6,10,20,0.96),rgba(15,23,42,0.98))]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-violet-400/15" />

      <div className="relative flex items-center justify-center px-6 text-center">
        <Image
          src="/slogo.png"
          alt="Shan Balbuena"
          width={140}
          height={140}
          priority
          className="size-36 object-contain sm:size-40 md:size-44"
        />
      </div>
    </div>
  );
}
