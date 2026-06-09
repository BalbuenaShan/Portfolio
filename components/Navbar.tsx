"use client";

import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const previousOverflowRef = React.useRef("");

  React.useEffect(() => {
    if (!open) {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full font-display transition-all duration-300 ease-out",
        !scrolled && !open && "border-b-0 bg-transparent backdrop-blur-none",
        scrolled &&
          !open &&
          "left-1/2 right-auto top-4 max-w-[58rem] -translate-x-1/2 rounded-full border border-border/70 bg-surface/70 shadow-lg shadow-accent/10 ring-1 ring-accent/5 backdrop-blur-xl",
        open && "border-b border-border/60 bg-surface/90 backdrop-blur-xl",
      )}
    >
      <nav
        className={cn(
          "mx-auto grid h-16 w-full grid-cols-2 items-center px-6 transition-all duration-300 ease-out md:grid-cols-[1fr_auto_1fr]",
          scrolled && !open && "h-14 px-4 md:px-5",
        )}
      >
        <a
          href="#hero"
          className="flex items-center justify-start h-16 md:h-16 rounded-full px-2 text-base font-normal tracking-wide text-accent transition-colors hover:text-accent/80 sm:text-lg"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/slogo.png"
            alt="Shan Balbuena"
            width={64}
            height={64}
            priority
            className="size-16 object-contain"
          />
        </a>

        <div className="hidden items-center justify-center gap-4 justify-self-center md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "h-16 flex items-center rounded-full px-3 text-base font-normal tracking-wide",
              })}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="h-10 flex items-center rounded-full px-5 text-base font-normal tracking-wide">
            <a href="#contact">Hire Me</a>
          </Button>
        </div>

        <div className="flex items-center justify-self-end gap-2 md:hidden">
          <ThemeToggle />
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="justify-self-end"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed left-0 right-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-hidden border-y border-border/60 bg-surface/90 backdrop-blur-xl transition-all duration-300 ease-out md:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-4">
          <div className="grid gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className: "h-12 justify-start rounded-xl px-4 text-lg font-normal tracking-wide",
                })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button asChild className="h-12 w-full rounded-xl text-lg font-normal tracking-wide">
            <a href="#contact" onClick={() => setOpen(false)}>
              Hire Me
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
