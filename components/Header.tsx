"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/systems", label: "Systems" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          scrolled
            ? "py-4 backdrop-blur-xl border-b"
            : "py-6"
        )}
        style={{
          background: scrolled ? "rgba(2,10,25,0.85)" : "transparent",
          borderColor: scrolled ? "#1A2D44" : "transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:scale-110"
              style={{ background: "linear-gradient(135deg, #6DEBFF, #B8FF3D)", color: "#020A19" }}
            >
              RK
            </div>
            <span className="font-semibold tracking-tight hidden sm:block" style={{ color: "#F5F7FA" }}>
              Rishi Kolluru
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === link.href ? "text-accent-cyan" : "text-muted hover:text-text"
                )}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "#6DEBFF" }}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span
              className="text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{ color: "#B8FF3D", borderColor: "rgba(184,255,61,0.3)", background: "rgba(184,255,61,0.05)" }}
            >
              ⌘K
            </span>
            <Link
              href="/contact"
              className="text-sm font-medium px-4 py-2 rounded-full transition-all"
              style={{ background: "#B8FF3D", color: "#020A19" }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn("w-6 h-0.5 transition-all", menuOpen && "rotate-45 translate-y-2")}
              style={{ background: "#F5F7FA" }}
            />
            <span
              className={cn("w-6 h-0.5 transition-all", menuOpen && "opacity-0")}
              style={{ background: "#F5F7FA" }}
            />
            <span
              className={cn("w-6 h-0.5 transition-all", menuOpen && "-rotate-45 -translate-y-2")}
              style={{ background: "#F5F7FA" }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[99] flex flex-col pt-24 px-8"
            style={{ background: "#020A19" }}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-bold"
                    style={{ color: pathname === link.href ? "#6DEBFF" : "#F5F7FA" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="inline-block text-sm font-medium px-6 py-3 rounded-full"
                  style={{ background: "#B8FF3D", color: "#020A19" }}
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
