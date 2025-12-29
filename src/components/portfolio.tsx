import { useState, useEffect, useRef } from "react"
import { animate, stagger, createTimeline } from "animejs"
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Phone,
  ExternalLink,
  Code2,
  Brain,
  Database,
  Layers,
  Terminal,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import ThreeScene from "@/components/three-scene"

// ==========================================
// DATA LAYER
// ==========================================
const PROFILE = {
  name: "DANIEL ROJAS GRASS",
  role: "SOFTWARE ARCHITECT & AI SPECIALIST",
  location: "La Habana, Cuba",
  phone: "+53 50671988",
  contact: {
    email: "danrodeveloper@outlook.com",
    linkedin: "https://linkedin.com/in/danrodev/",
    github: "https://github.com/danro-dev",
  },
  summary:
    "Ingeniero en Ciencias Informáticas con 3 años de experiencia profesional como desarrollador, analista y arquitecto de software. Especialista en la construcción de sistemas inteligentes basados en IA, particularmente en sistemas multi-agente RAG especializados utilizando Python, FastAPI y frameworks como LangChain y LangGraph.",
  experience: [
    {
      company: "ZONASOFT",
      location: "Barcelona, España",
      role: "Frontend Lead, Analista y Arquitecto de Software",
      period: "Agosto 2024 — Diciembre 2025",
      highlights: [
        "Lideré un equipo de desarrollo en la construcción de soluciones full-stack",
        "Desarrollé interfaces de usuario en React con principios de Clean Code y Scream Architecture",
        "Diseñé soluciones de IA con OpenAI para generación de imágenes y asistentes inteligentes",
      ],
    },
    {
      company: "UNIVERSIDAD DE LAS CIENCIAS INFORMÁTICAS",
      location: "La Habana, Cuba",
      role: "Desarrollador FullStack",
      period: "Julio 2023 — Agosto 2025",
      highlights: [
        "Diseñé e implementé sistema multi-agente RAG + Pandas AI con 90% efectividad",
        "Creé agente personal con escucha en tiempo real y respuesta TTS usando Gemma en LMStudio",
        "Desarrollé backend en Node.js con Express y WebSockets para trazabilidad de modelos LLM",
      ],
    },
  ],
  education: {
    institution: "Universidad de las Ciencias Informáticas",
    degree: "Ingeniería en Ciencias Informáticas",
    graduation: "Junio 2025",
    honors: ["Premio al Mérito Científico", "Participación en ICPC a nivel latinoamericano"],
  },
  skills: {
    ai: ["Python", "FastAPI", "Django", "Node.js", "Express.js", "n8n", "Vapi"],
    systems: ["Multi-Agent Systems", "RAG", "LangChain", "LangGraph", "OpenAI API", "Gemini API", "Pandas AI", "MCP Servers"],
    frontend: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    tools: ["Git", "GitHub", "Docker", "AWS", "Lambda", "API Gateway", "Cursor", "Copilot"],
    databases: ["PostgreSQL", "MongoDB", "Pinecone", "ChromaDB"],
  },
  languages: ["Español (Nativo)", "Inglés (Fluido)"],
}

const PROJECTS = [
  { id: 1, name: "QRY-DOC", category: "AI ENGINE", desc: "Motor de análisis generativo que transforma lenguaje natural en código ejecutable, visualizaciones y reportes PDF profesionales.", tech: ["Python", "PandasAI", "LLMs"], link: "https://github.com/danro-dev/qry-doc", featured: true },
  { id: 2, name: "H-CHAT SYSTEM", category: "MULTI-AGENT RAG", desc: "Sistema complejo de agentes múltiples orquestado con LangGraph para análisis de registros históricos marítimos. 90% de efectividad.", tech: ["FastAPI", "LangGraph", "React"], link: "https://github.com/danro-dev/Sistema-Multiagente-HChat", featured: true },
  { id: 3, name: "HEXAGONAL SCREAM", category: "ENTERPRISE ERP", desc: "Sistema integral de gestión empresarial con Arquitectura Hexagonal: diagnósticos, checklists, reportes con IA.", tech: ["React", "Redux", "Django"], link: "https://github.com/Netsy-Ai/AP-hexagonal-scream", featured: true },
  { id: 4, name: "NETSY AUDIT", category: "SECURE API", desc: "Infraestructura backend para auditorías de seguridad, gestión de usuarios y generación automatizada de reportes.", tech: ["Django REST", "OpenAI", "JWT"], link: "https://github.com/Netsy-Ai/audit_project", featured: false },
  { id: 5, name: "VEGANCOIN", category: "WEB3 PLATFORM", desc: "Ecosistema digital enfocado en sostenibilidad, integrado con Google Gemini para análisis de impacto.", tech: ["Node.js", "Gemini API", "TypeScript"], link: "https://github.com/danro-dev/vegancoin-landing-page", featured: false },
  { id: 6, name: "N8N WIDGET", category: "AGENT UI", desc: "Componente de chat modular y personalizable diseñado para interactuar con agentes de n8n.", tech: ["TypeScript", "n8n", "CSS"], link: "https://github.com/Netsy-Ai/n8n-whitget", featured: false },
]

// ==========================================
// NAVIGATION
// ==========================================
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)

    // Animate nav on mount
    animate('.nav-logo', {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      delay: 300,
      ease: 'outExpo',
    })

    animate('.nav-item', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      delay: stagger(80, { start: 500 }),
      ease: 'outExpo',
    })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Sobre Mí", href: "#about" },
    { label: "Experiencia", href: "#experience" },
    { label: "Proyectos", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contacto", href: "#contact" },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/10" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="#" className="nav-logo group opacity-0">
            <img src="/img/logo.png" alt="DR.GRASS" className="h-12 group-hover:opacity-70 transition-opacity" />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item text-xs font-medium tracking-widest text-black/60 hover:text-black transition-colors relative group opacity-0"
              >
                {item.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden text-black p-2" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-100 bg-white">
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-16">
              <img src="/img/logo.png" alt="DR.GRASS" className="h-12" />
              <button onClick={() => setIsOpen(false)} className="text-black p-2" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold text-black hover:text-black/60 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}


// ==========================================
// HERO SECTION
// ==========================================
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Split text into characters for animation
    const titleLines = document.querySelectorAll('.hero-title-line')
    titleLines.forEach((line) => {
      const text = line.textContent || ''
      line.innerHTML = text
        .split('')
        .map((char) => `<span class="char" style="display:inline-block;opacity:0;transform:translateY(100px) rotateX(-80deg)">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
    })

    // Main hero timeline
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })

    tl.add('.hero-badge', {
      opacity: [0, 1],
      translateX: [-50, 0],
      duration: 1000,
    }, 400)
    .add('.hero-title-line .char', {
      opacity: [0, 1],
      translateY: [100, 0],
      rotateX: [-80, 0],
      duration: 1200,
      delay: stagger(25),
    }, 600)
    .add('.hero-subtitle', {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
    }, 1200)
    .add('.hero-description', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, 1400)
    .add('.hero-cta', {
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.9, 1],
      duration: 800,
      delay: stagger(150),
    }, 1600)
    .add('.hero-location', {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
    }, 1800)
    .add('.hero-scroll', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    }, 2000)

    // Parallax on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroContent = document.querySelector('.hero-content') as HTMLElement
      if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`
        heroContent.style.opacity = `${1 - scrollY / (window.innerHeight * 0.8)}`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="hero-content relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full pt-24">
        {/* Status Badge */}
        <div className="hero-badge mb-8 flex items-center gap-3 opacity-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600" />
          </span>
          <span className="text-xs font-mono tracking-widest text-black/50 uppercase">Disponible para proyectos</span>
        </div>

        {/* Main Title */}
        <div className="overflow-hidden">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85]">
            <span className="hero-title-line block text-black" style={{ perspective: '1000px' }}>DANIEL</span>
            <span className="hero-title-line block text-black/25" style={{ perspective: '1000px' }}>ROJAS GRASS</span>
          </h1>
        </div>

        {/* Role & Description */}
        <div className="mt-12 border-l-2 border-black pl-8 max-w-2xl">
          <h2 className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-light text-black mb-4 opacity-0">
            Arquitecto de Software & Especialista en IA
          </h2>
          <p className="hero-description text-black/50 text-base md:text-lg leading-relaxed opacity-0">
            Diseño y construyo sistemas inteligentes multi-agente que escalan. Especializado en RAG, LangChain y
            arquitecturas de microservicios.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 mb-32 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="hero-cta group px-8 py-4 bg-black text-white font-bold text-sm tracking-widest hover:bg-black/80 transition-all flex items-center gap-3 opacity-0"
          >
            HABLEMOS
            <Mail size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={PROFILE.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group px-8 py-4 border border-black/30 text-black font-bold text-sm tracking-widest hover:bg-black/5 transition-all flex items-center gap-3 opacity-0"
          >
            GITHUB
            <Github size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Location */}
        <div className="hero-location absolute bottom-12 left-6 md:left-12 flex items-center gap-3 opacity-0">
          <MapPin size={14} className="text-black/40" />
          <span className="text-xs font-mono text-black/40 tracking-wider">
            LA HABANA, CUBA — DISPONIBLE GLOBALMENTE
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll absolute bottom-12 right-6 md:right-12 opacity-0">
          <div className="animate-bounce">
            <ChevronDown size={24} className="text-black/40" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// ABOUT SECTION
// ==========================================
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const tl = createTimeline({ defaults: { ease: 'outExpo' } })

            tl.add('.about-label', {
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 800,
            }, 0)
            .add('.about-line', {
              scaleX: [0, 1],
              duration: 600,
            }, 200)
            .add('.about-summary', {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
            }, 300)
            .add('.about-card', {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(150),
            }, 600)
            .add('.about-honor', {
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 600,
              delay: stagger(100),
            }, 900)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="about-label text-sm font-mono tracking-widest text-black/50 mb-4 uppercase sticky top-32 opacity-0">Sobre Mí</h2>
            <div className="about-line w-16 h-px bg-black/30 origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="about-summary text-2xl md:text-3xl lg:text-4xl font-light text-black leading-relaxed opacity-0">{PROFILE.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/10">
              <div className="about-card opacity-0">
                <h3 className="text-sm font-mono tracking-widest text-black/50 mb-4">IDIOMAS</h3>
                <div className="flex flex-wrap gap-3">
                  {PROFILE.languages.map((lang) => (
                    <span key={lang} className="px-4 py-2 border border-black/20 text-black/80 text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about-card opacity-0">
                <h3 className="text-sm font-mono tracking-widest text-black/50 mb-4">EDUCACIÓN</h3>
                <div className="flex items-start gap-3">
                  <GraduationCap size={20} className="text-black/50 mt-1" />
                  <div>
                    <p className="text-black font-medium">{PROFILE.education.degree}</p>
                    <p className="text-black/60 text-sm">{PROFILE.education.institution}</p>
                    <p className="text-black/40 text-xs mt-1">{PROFILE.education.graduation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/10">
              <h3 className="text-sm font-mono tracking-widest text-black/50 mb-4">RECONOCIMIENTOS</h3>
              <div className="flex flex-wrap gap-4">
                {PROFILE.education.honors.map((honor) => (
                  <div key={honor} className="about-honor flex items-center gap-2 opacity-0">
                    <Award size={16} className="text-amber-600" />
                    <span className="text-black/80 text-sm">{honor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ==========================================
// EXPERIENCE SECTION
// ==========================================
function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            animate('.exp-title', {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
              ease: 'outExpo',
            })

            animate('.exp-icon', {
              opacity: [0, 1],
              scale: [0.5, 1],
              rotate: [-180, 0],
              duration: 800,
              delay: 200,
              ease: 'outBack(1.5)',
            })

            animate('.exp-card', {
              opacity: [0, 1],
              translateX: [-80, 0],
              duration: 1000,
              delay: stagger(200, { start: 400 }),
              ease: 'outExpo',
            })

            animate('.exp-highlight', {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: stagger(80, { start: 800 }),
              ease: 'outExpo',
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10 bg-neutral-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 border-b border-black/20 pb-6">
          <h2 className="exp-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black opacity-0">EXPERIENCIA</h2>
          <Briefcase size={32} className="exp-icon text-black/30 hidden md:block opacity-0" />
        </div>

        <div className="space-y-16">
          {PROFILE.experience.map((exp, i) => (
            <div key={i} className="exp-card group relative opacity-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-black/10">
                <div className="lg:col-span-4">
                  <span className="font-mono text-sm text-black/40">{exp.period}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mt-2">{exp.company}</h3>
                  <p className="text-black/60 text-sm mt-1 flex items-center gap-2">
                    <MapPin size={12} />
                    {exp.location}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <h4 className="text-xl text-black/90 mb-6 font-medium">{exp.role}</h4>
                  <ul className="space-y-4">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} className="exp-highlight flex items-start gap-4 group/item opacity-0">
                        <span className="w-2 h-2 bg-black/30 mt-2 group-hover/item:bg-black transition-colors" />
                        <span className="text-black/60 leading-relaxed group-hover/item:text-black/80 transition-colors">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==========================================
// PROJECTS SECTION
// ==========================================
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const [filter, setFilter] = useState<"all" | "featured">("all")

  const filteredProjects = filter === "featured" ? PROJECTS.filter((p) => p.featured) : PROJECTS

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            animate('.projects-title', {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
              ease: 'outExpo',
            })

            animate('.projects-filter', {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              delay: stagger(100, { start: 300 }),
              ease: 'outExpo',
            })

            animate('.project-card', {
              opacity: [0, 1],
              translateY: [80, 0],
              scale: [0.9, 1],
              duration: 800,
              delay: stagger(100, { start: 500 }),
              ease: 'outExpo',
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Hover animations for project cards
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    
    cards.forEach((card) => {
      const arrow = card.querySelector('.project-arrow')
      
      card.addEventListener('mouseenter', () => {
        animate(card, { scale: 1.02, duration: 300, ease: 'outExpo' })
        if (arrow) {
          animate(arrow, { translateX: 5, translateY: -5, duration: 300, ease: 'outExpo' })
        }
      })

      card.addEventListener('mouseleave', () => {
        animate(card, { scale: 1, duration: 300, ease: 'outExpo' })
        if (arrow) {
          animate(arrow, { translateX: 0, translateY: 0, duration: 300, ease: 'outExpo' })
        }
      })
    })
  }, [filteredProjects])

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/20">
          <h2 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6 md:mb-0 opacity-0">
            PROYECTOS
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`projects-filter text-xs font-mono tracking-widest transition-colors opacity-0 ${
                filter === "all" ? "text-black border-b border-black" : "text-black/40 hover:text-black/60"
              }`}
            >
              TODOS
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`projects-filter text-xs font-mono tracking-widest transition-colors opacity-0 ${
                filter === "featured" ? "text-black border-b border-black" : "text-black/40 hover:text-black/60"
              }`}
            >
              DESTACADOS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group relative bg-neutral-50 border border-black/10 p-8 hover:bg-neutral-100 hover:border-black/20 transition-colors duration-300 opacity-0"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest text-black/40 px-2 py-1 border border-black/10">
                  {project.category}
                </span>
                <ArrowUpRight size={20} className="project-arrow text-black/30 group-hover:text-black transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-black/80 transition-colors">
                {project.name}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6">{project.desc}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-black/40 bg-black/5 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="w-2 h-2 bg-green-500 block" />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


// ==========================================
// SKILLS SECTION
// ==========================================
function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  const skillCategories = [
    { title: "IA & Backend", icon: Brain, skills: PROFILE.skills.ai },
    { title: "Sistemas Inteligentes", icon: Layers, skills: PROFILE.skills.systems },
    { title: "Frontend", icon: Code2, skills: PROFILE.skills.frontend },
    { title: "DevOps & Tools", icon: Terminal, skills: PROFILE.skills.tools },
    { title: "Bases de Datos", icon: Database, skills: PROFILE.skills.databases },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            animate('.skills-title', {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
              ease: 'outExpo',
            })

            animate('.skills-subtitle', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              ease: 'outExpo',
            })

            animate('.skill-category', {
              opacity: [0, 1],
              translateY: [60, 0],
              rotateX: [-15, 0],
              duration: 800,
              delay: stagger(100, { start: 400 }),
              ease: 'outExpo',
            })

            setTimeout(() => {
              animate('.skill-tag', {
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 400,
                delay: stagger(20),
                ease: 'outBack(2)',
              })
            }, 800)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10 bg-neutral-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="skills-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6 opacity-0">
            STACK TECNOLÓGICO
          </h2>
          <p className="skills-subtitle text-black/50 max-w-2xl mx-auto opacity-0">
            Herramientas y tecnologías que domino para construir soluciones escalables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category bg-white border border-black/10 p-8 opacity-0"
              style={{ perspective: '1000px' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon size={24} className="text-black/60" />
                <h3 className="text-lg font-bold text-black">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag text-xs font-mono px-3 py-2 bg-neutral-50 text-black/70 border border-black/10 hover:border-black/30 hover:bg-neutral-100 transition-colors cursor-default opacity-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==========================================
// CONTACT SECTION
// ==========================================
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const tl = createTimeline({ defaults: { ease: 'outExpo' } })

            tl.add('.contact-title', {
              opacity: [0, 1],
              translateY: [80, 0],
              duration: 1200,
            }, 0)
            .add('.contact-description', {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1000,
            }, 300)
            .add('.contact-link', {
              opacity: [0, 1],
              translateX: [-40, 0],
              duration: 800,
              delay: stagger(100),
            }, 500)
            .add('.contact-social-title', {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
            }, 700)
            .add('.contact-social', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: stagger(100),
            }, 800)
            .add('.contact-footer', {
              opacity: [0, 1],
              duration: 800,
            }, 1000)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 opacity-0">
              TRABAJEMOS
              <br />
              <span className="text-white/30">JUNTOS</span>
            </h2>
            <p className="contact-description text-white/60 text-lg leading-relaxed mb-12 max-w-md opacity-0">
              Estoy disponible para proyectos de IA, arquitectura de software y desarrollo full-stack. Hablemos sobre
              cómo puedo ayudarte.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="contact-link flex items-center gap-4 text-white/80 hover:text-white transition-colors group opacity-0"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-mono text-sm">{PROFILE.contact.email}</span>
              </a>

              <a
                href={`tel:${PROFILE.phone}`}
                className="contact-link flex items-center gap-4 text-white/80 hover:text-white transition-colors group opacity-0"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone size={20} />
                </div>
                <span className="font-mono text-sm">{PROFILE.phone}</span>
              </a>

              <div className="contact-link flex items-center gap-4 text-white/80 opacity-0">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <span className="font-mono text-sm">{PROFILE.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="contact-social-title text-sm font-mono tracking-widest text-white/50 mb-6 opacity-0">CONECTA CONMIGO</h3>

              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social flex items-center justify-between p-6 border border-white/10 hover:bg-white/5 transition-colors group opacity-0"
              >
                <div className="flex items-center gap-4">
                  <Linkedin size={24} />
                  <span className="font-medium">LinkedIn</span>
                </div>
                <ExternalLink size={20} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social flex items-center justify-between p-6 border border-white/10 hover:bg-white/5 transition-colors group opacity-0"
              >
                <div className="flex items-center gap-4">
                  <Github size={24} />
                  <span className="font-medium">GitHub</span>
                </div>
                <ExternalLink size={20} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="contact-footer mt-12 pt-8 border-t border-white/10 opacity-0">
              <p className="text-white/30 text-sm font-mono">
                © {new Date().getFullYear()} Daniel Rojas Grass. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// MAIN EXPORT
// ==========================================
export default function Portfolio() {
  return (
    <>
      <ThreeScene />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  )
}
