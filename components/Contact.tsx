"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { href: "https://github.com/BalbuenaShan", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/shan-balbuena-5aa53b30b", label: "LinkedIn", icon: Linkedin },
];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="bg-background py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Contact
        </p>
        <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          Let&apos;s Work Together
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Have a product idea or web app that needs a
          careful build? I would love to hear what you are making.
        </p>
        <a
          href="mailto:kurvbalbuena@gmail.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent/90"
        >
          <Mail size={20} />
          kurvbalbuena@gmail.com
        </a>
        <div className="mt-8 flex justify-center gap-6">
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
