"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Build Complete CMS Blog in PHP MySQL Bootstrap & PDO",
    issuer: "Udemy",
    year: "2024",
    certificateUrl: "/certificates/Udemy%20Cert%20-%20Balbuena.pdf",
  },
  {
    title: "Introduction to SQL",
    issuer: "SimpliLearn",
    year: "2024",
    certificateUrl: "/certificates/MySQL%20Cert.pdf",
  },
  {
    title: "Introduction to Front End Development",
    issuer: "SimpliLearn",
    year: "2026",
    certificateUrl: "/certificates/9934880_10223667_1772973377985.pdf",
  },
  {
    title: "ReactJS for Beginners",
    issuer: "SimpliLearn",
    year: "2026",
    certificateUrl: "/certificates/9932208_10223667_1772900405380.pdf",
  },
  {
    title: "2026 11th International Conference on Multimedia and Image Processing",
    issuer: "ICIMP",
    year: "2026",
    certificateUrl: "/certificates/PP531.pdf",
  },
];

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      className="bg-background py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Certifications
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Credentials worth highlighting
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.article
              key={`${cert.title}-${index}`}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-surface to-surface-elevated p-6 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.20)] dark:shadow-[0_18px_60px_-32px_rgba(0,0,0,0.55)]"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,70,231,0.10),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <BadgeCheck size={22} />
                </div>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {cert.year}
                </span>
              </div>

              <div className="relative mt-6">
                <h3 className="text-2xl font-bold text-foreground">{cert.title}</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">
                  {cert.issuer}
                </p>

                <p className="mt-6 text-sm text-muted-foreground">Completed in {cert.year}</p>

                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent/90"
                >
                  View Certificate
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
