export const site = {
  name: "Rishi Kolluru",
  role: "AI Systems Engineer",
  tagline: "I build AI systems that retrieve, reason, route, and ship.",
  subtitle:
    "MS Computer Science at the University at Buffalo. I work on multimodal retrieval, LLM agents, RAG infrastructure, and production-grade ML systems.",
  location: "Buffalo, NY",
  email: "rishikolluru.work@gmail.com",
  phone: "+1-716-553-1440",
  github: "https://github.com/RishDevs",
  githubUser: "RishDevs",
  linkedin: "https://www.linkedin.com/in/rishi-kolluru/",
} as const

export const nav = [
  { label: "Index", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Systems", href: "/systems" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

export const socials = [
  { label: "GitHub", href: site.github, handle: "@RishDevs" },
  { label: "LinkedIn", href: site.linkedin, handle: "/rishi-kolluru" },
  { label: "Email", href: `mailto:${site.email}`, handle: site.email },
] as const
