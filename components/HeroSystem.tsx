"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Link from "next/link"

const HeroCanvas = dynamic(() => import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at center, rgba(109,235,255,0.05) 0%, transparent 70%)" }}
    />
  ),
})

export function HeroSystem() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#020A19" }}>
      {/* Three.js particle field */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #020A19 100%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(#1A2D44 1px, transparent 1px), linear-gradient(90deg, #1A2D44 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ borderColor: "rgba(109,235,255,0.3)", background: "rgba(109,235,255,0.05)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#B8FF3D" }}
            />
            <span className="text-xs font-mono" style={{ color: "#6DEBFF" }}>
              Available for AI/ML roles · MS CSE @ University at Buffalo
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="text-display"
              style={{ color: "#F5F7FA" }}
            >
              I build AI systems
              <br />
              that{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #B8FF3D, #6DEBFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                retrieve, reason,
              </span>
              <br />
              route, and ship.
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
            style={{ color: "#A7B0C0" }}
          >
            MS Computer Science student at University at Buffalo building multimodal
            retrieval, LLM agents, RAG pipelines, and production-grade ML systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "#B8FF3D", color: "#020A19" }}
            >
              Explore Work
              <span>→</span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm border transition-all hover:border-accent-cyan"
              style={{ border: "1px solid #1A2D44", color: "#F5F7FA" }}
            >
              View Resume
            </Link>
          </motion.div>

          {/* Micro status */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-8 text-xs font-mono"
            style={{ color: "#A7B0C0" }}
          >
            Currently focused on{" "}
            <span style={{ color: "#6DEBFF" }}>multimodal retrieval</span>,{" "}
            <span style={{ color: "#8C6CFF" }}>agentic systems</span>, and{" "}
            <span style={{ color: "#B8FF3D" }}>reliable LLM infrastructure</span>.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono" style={{ color: "#A7B0C0" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, #6DEBFF, transparent)" }}
        />
      </motion.div>
    </section>
  )
}
