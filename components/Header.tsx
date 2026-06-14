"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { nav, site, socials } from "@/lib/site"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  const openCmd = () => {
    window.dispatchEvent(new CustomEvent("open-command-menu"))
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--color-line)] bg-[rgba(2,10,25,0.72)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[68px] items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
            data-cursor
            aria-label="Rishi Kolluru — home"
          >
            <span className="relative grid h-8 w-8 place-items-center">
              <span className="absolute inset-0 rounded-md border border-[var(--color-line-2)]" />
              <span className="font-display text-sm font-semibold text-green">
                R
              </span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">
                Rishi Kolluru
              </span>
              <span className="label-sm mt-1 text-faint">
                AI Systems Engineer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.slice(1).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor
                  className={`label-sm transition-colors hover:text-text ${
                    active ? "text-green" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openCmd}
              data-cursor
              className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-muted transition-colors hover:border-[var(--color-line-2)] hover:text-text md:flex"
              aria-label="Open command menu"
            >
              <span className="label-sm">Menu</span>
              <kbd className="font-mono text-[0.65rem] text-faint">⌘K</kbd>
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              data-cursor
              className="relative grid h-10 w-10 place-items-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-5 bg-text transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-text transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile / full menu */}
      <div
        className={`fixed inset-0 z-[79] flex flex-col bg-[var(--color-bg)] transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="wrap flex flex-1 flex-col justify-center gap-1 pt-20">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-[var(--color-line)] py-4"
            >
              <span className="label-sm text-faint">
                0{i + 1}
              </span>
              <span className="display-lg transition-colors group-hover:text-green">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="wrap flex flex-wrap gap-x-6 gap-y-2 pb-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm text-muted hover:text-text"
            >
              {s.label} ↗
            </a>
          ))}
          <span className="label-sm text-faint">{site.email}</span>
        </div>
      </div>
    </>
  )
}
