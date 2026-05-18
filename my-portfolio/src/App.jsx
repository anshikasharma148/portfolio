import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Server,
  Layers,
  Cpu,
  LineChart,
  BadgeCheck,
} from 'lucide-react'
import './App.css'
import jpvlLogo from './assets/jpvl-logo.jpg'
import digitalUmbrellaLogo from './assets/digital-umbrella-logo.png'
import drdoLogo from './assets/drdo-logo.jpg'
import React from 'react'
import SkillIcon3D from './components/SkillIcon3D'
import ContactDetails from './components/ContactDetails'
import Contact3DIcon from './components/Contact3DIcon'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import CursorGlow from './components/CursorGlow'
import portImage from './assets/portimage.jpeg'
import cvPDF from './assets/anshika-sharma-cv.pdf'
import { useCardTilt } from './hooks/useCardTilt'
import {
  easePremium,
  fadeUp,
  staggerContainer,
  defaultViewport,
  headingStagger,
  headingItem,
} from './motion/variants.js'

function Navbar({ theme, toggleTheme, activeNav }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const reduce = useReducedMotion()

  const navLinkClass = (id) => (activeNav === id ? 'nav-link-active' : undefined)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const navClass = `navbar theme-${theme}`

  return (
    <motion.nav
      className={navClass}
      initial={{ y: reduce ? 0 : -12, opacity: reduce ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: easePremium }}
    >
      <div className="navbar-left">
        <span className="logo-mark" aria-hidden>AS</span>
        <span className="navbar-title">Anshika Sharma</span>
      </div>
      {isMobile ? (
        <>
          <button type="button" className="hamburger-menu" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} strokeWidth={2} />
          </button>
          {sidebarOpen && (
            <>
              <motion.div
                className="sidebar-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                role="presentation"
              />
              <motion.aside
                className="sidebar-nav"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              >
                <button type="button" className="sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
                  <X size={22} />
                </button>
                <a href="#overview" className={navLinkClass('overview')} onClick={() => setSidebarOpen(false)}>About</a>
                <a href="#projects" className={navLinkClass('projects')} onClick={() => setSidebarOpen(false)}>Projects</a>
                <a href="#work" className={navLinkClass('work')} onClick={() => setSidebarOpen(false)}>Experience</a>
                <a href="#education" className={navLinkClass('education')} onClick={() => setSidebarOpen(false)}>Education</a>
                <a href="#skills" className={navLinkClass('skills')} onClick={() => setSidebarOpen(false)}>Skills</a>
                <a href="#contact" className={navLinkClass('contact')} onClick={() => setSidebarOpen(false)}>Contact</a>
                <button type="button" className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
                  {theme === 'dark' ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
                </button>
              </motion.aside>
            </>
          )}
        </>
      ) : (
        <div className="navbar-links">
          <a href="#overview" className={navLinkClass('overview')}>About</a>
          <a href="#projects" className={navLinkClass('projects')}>Projects</a>
          <a href="#work" className={navLinkClass('work')}>Experience</a>
          <a href="#education" className={navLinkClass('education')}>Education</a>
          <a href="#skills" className={navLinkClass('skills')}>Skills</a>
          <a href="#contact" className={navLinkClass('contact')}>Contact</a>
          <button type="button" className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>
        </div>
      )}
    </motion.nav>
  )
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="hero-section hero-left-layout portfolio-section" id="top">
      <div className="hero-content hero-content-left">
        <div className="hero-copy-shell">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: easePremium }}
        >
          Guna, Madhya Pradesh · Open to impactful engineering roles
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easePremium, delay: reduce ? 0 : 0.06 }}
        >
          <span className="hero-hi">Hi, I&apos;m</span>
          {' '}
          <span className="hero-name">Anshika Sharma</span>
        </motion.h1>
        <motion.h2
          className="hero-subtitle"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easePremium, delay: reduce ? 0 : 0.12 }}
        >
          Software Development Engineer building scalable backends, full-stack products, and data-driven web systems.
        </motion.h2>
        <motion.p
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.18, duration: reduce ? 0 : 0.45 }}
        >
          <span className="hero-pill">JPVL · Software Developer</span>
          <span className="hero-pill muted">Since Mar 2025</span>
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.22, duration: reduce ? 0 : 0.45, ease: easePremium }}
        >
          <a href="#projects" className="cta-btn hero-secondary-btn">View projects</a>
          <a
            href={cvPDF}
            className="cta-btn hero-cv-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download résumé
          </a>
        </motion.div>
        </div>
      </div>
      <motion.div
        className="hero-image-3d-container"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.65, ease: easePremium, delay: reduce ? 0 : 0.08 }}
      >
        <div className="hero-image-frame">
          <img src={portImage} alt="Anshika Sharma" className="hero-image-3d" />
        </div>
      </motion.div>
      <motion.a
        href="#overview"
        className="hero-scroll-cue"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.6, duration: 0.4 }}
      >
        <span className="sr-only">Scroll to content</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} strokeWidth={1.75} />
        </motion.span>
      </motion.a>
    </section>
  )
}

function Introduction() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const cards = [
    { title: 'Backend & APIs', Icon: Server },
    { title: 'Full-stack delivery', Icon: Layers },
    { title: 'Next.js & React', Icon: Cpu },
    { title: 'Data & reliability', Icon: LineChart },
    { title: 'Production quality', Icon: BadgeCheck },
  ]

  return (
    <motion.section
      className="intro-section portfolio-section"
      id="overview"
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <div className="intro-inner">
        <div className="intro-label">Introduction</div>
        <h2 className="intro-title">Overview<span className="section-accent" /></h2>
        <p className="intro-desc">
          I&apos;m a Software Development Engineer with experience building scalable backend services and full-stack applications.
          I design RESTful APIs, ship maintainable TypeScript/JavaScript services, and care about performance, reliability, and clear UX.
          Recent work spans enterprise hydrology monitoring, institutional web platforms, secure academic systems, and an in-progress trading journal for Android.
        </p>
      </div>
      <motion.div
        className="intro-cards"
        variants={staggerContainer(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {cards.map(({ title, Icon }) => (
          <motion.div key={title} className="intro-card-pro" variants={fadeUp(reduce)}>
            <Icon className="intro-card-svg" strokeWidth={1.5} size={26} aria-hidden />
            <div className="intro-card-title">{title}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

function BentoArticle({ p, reduce }) {
  const tilt = useCardTilt(reduce)
  return (
    <motion.article
      className={`bento-card glass-panel span-${p.span}`}
      variants={fadeUp(reduce)}
      whileHover={reduce ? {} : { y: -4, transition: { duration: 0.22, ease: easePremium } }}
    >
      <div
        ref={tilt.ref}
        className="bento-card-tilt-surface"
        style={tilt.style}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
      >
        <div className="bento-card-top">
          <span className={`project-status tone-${p.statusTone}`}>{p.status}</span>
          <h3 className="bento-title">{p.title}</h3>
          <p className="bento-blurb">{p.blurb}</p>
        </div>
        <ul className="bento-bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="bento-tags">
          {p.tech.map((t) => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
        {p.href ? (
          <a className="bento-link" href={p.href} target="_blank" rel="noopener noreferrer">Visit site</a>
        ) : p.inProgress ? (
          <span className="bento-link muted">In active development · store link coming soon</span>
        ) : (
          <span className="bento-link muted">Internal / offline delivery</span>
        )}
      </div>
    </motion.article>
  )
}

function ProjectsSection() {
  const reduce = useReducedMotion()
  const projects = [
    {
      title: 'JUET Quiz Portal',
      status: 'Delivered',
      statusTone: 'shipped',
      tech: ['Next.js', 'Node.js', 'Express', 'MySQL'],
      blurb: 'Secure, role-based quiz platform for large cohorts: admin onboarding, faculty quiz lifecycle, and timed student attempts with integrity controls.',
      bullets: ['RBAC, verification states, eligibility by year/semester/batch', 'Fullscreen and violation tracking; indexed DB and pool tuning for concurrency'],
      href: null,
      span: 'wide',
    },
    {
      title: 'Hydrology monitoring (JPVL / NHPC)',
      status: 'Live · 24×7',
      statusTone: 'live',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'REST', 'Leaflet', 'ECharts'],
      blurb: 'Consultancy build for JPVL to support round-the-clock weather and hydrological monitoring for JP Hydro Vishnuprayag (incl. NHPC context). The system ingests field data from stations such as Mana, Vasudhara, Barrage, and Benakuli, normalizes AWS/EWS telemetry in MySQL, and gives operators SCADA-style views, trends, and exportable reports for day-to-day plant decisions.',
      bullets: [
        '15‑minute CSV pipelines from Barani and Geolux dataloggers into validated parsers and relational storage (AWS/EWS datasets, users, operational tables).',
        'REST APIs for live and historical reads; secure JWT-based auth and role-aware access for operational users.',
        'Operator UI: real-time dashboards (ECharts/Recharts), risk/discharge visualization, and Leaflet map layers for spatial situational awareness.',
        'API proxy/rewrite patterns so the Next.js frontend and Node services deploy cleanly together with fewer cross-origin issues.',
        'Sole developer end-to-end: deployed and running 24×7 at the plant for extended continuous operation with dependable visibility for control-room workflows.',
      ],
      href: 'https://hydrologyjpvl.cird.co.in',
      span: 'tall',
    },
    {
      title: 'Hydrology monitoring API',
      status: 'Live',
      statusTone: 'live',
      tech: ['Next.js', 'TypeScript', 'Express', 'MySQL'],
      blurb: 'Authenticated API and dashboard for station metadata, historical queries, and resilient proxying when upstream feeds fluctuate.',
      bullets: ['JWT and bcrypt; structured error paths for auth expiry and outages', 'Filterable dashboards with pagination and refresh'],
      href: 'https://hydrologyapi.cird.co.in',
      span: 'default',
    },
    {
      title: 'CIRD web platform',
      status: 'Shipped',
      statusTone: 'shipped',
      tech: ['Next.js', 'OpenAI APIs', 'Full-stack'],
      blurb: 'Centre for Industrial R&D site: research, entities, training, MoUs, hydrology modules, and guided discovery via a secure ChatGPT-style assistant.',
      bullets: ['Modular UI, animated homepage sections (EWS/AWS and hydrology)', 'Backend-validated assistant prompts for safer answers'],
      href: 'https://cird.co.in',
      span: 'default',
    },
    {
      title: 'JUET Outing App',
      status: 'Delivered',
      statusTone: 'shipped',
      tech: ['React Native (Expo)', 'Node.js', 'MongoDB', 'Socket.io'],
      blurb: 'Safety-focused outing coordination: OTP auth, group chat, gate check-in/out with geolocation, admin live dashboards, and daily PDF logs.',
      bullets: ['Real-time Socket.io messaging and notifications', 'Admin visibility after 7 PM for pending returns'],
      href: null,
      span: 'wide',
    },
    {
      title: 'TradeZen',
      status: 'In progress',
      statusTone: 'wip',
      tech: ['React Native', 'Node.js', 'Prisma ORM', 'MySQL', 'Monorepo'],
      blurb: 'Production-oriented trading journal and analytics for Android: log trades, P&amp;L, risk–reward, psychology tags, and fintech-style dashboards—with room for future AI-assisted review.',
      bullets: ['Modular monorepo; calculation engines and broker-inspired trade views', 'Scalable API layer with Prisma and MySQL for journaling and performance metrics'],
      href: null,
      span: 'wide',
      inProgress: true,
    },
  ]

  return (
    <motion.section
      className="projects-section portfolio-section"
      id="projects"
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <motion.div
        className="section-heading"
        variants={headingStagger(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        <motion.div className="section-kicker" variants={headingItem(reduce)}>Selected work</motion.div>
        <motion.h2 className="work-title" variants={headingItem(reduce)}>
          Projects<span className="section-accent" />
        </motion.h2>
        <motion.p className="section-lead" variants={headingItem(reduce)}>
          Shipped work and active builds — from classroom-scale platforms to plant monitoring and mobile fintech-style tools.
        </motion.p>
      </motion.div>
      <motion.div
        className="bento-grid"
        variants={staggerContainer(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((p) => (
          <BentoArticle key={p.title} p={p} reduce={reduce} />
        ))}
      </motion.div>
    </motion.section>
  )
}

function EducationSection() {
  const reduce = useReducedMotion()
  return (
    <motion.section
      className="education-section portfolio-section"
      id="education"
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <motion.div
        className="section-heading tight"
        variants={headingStagger(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        <motion.div className="section-kicker muted-kicker" variants={headingItem(reduce)}>Academics</motion.div>
        <motion.h2 className="intro-title" variants={headingItem(reduce)}>
          Education<span className="section-accent" />
        </motion.h2>
      </motion.div>
      <motion.div
        className="education-card glass-panel"
        variants={fadeUp(reduce, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div>
          <h3 className="edu-degree">B.Tech, Computer Science &amp; Engineering</h3>
          <p className="edu-school">Jaypee University of Engineering &amp; Technology (JUET), Guna</p>
          <p className="edu-dates">Jul 2021 – Jun 2025</p>
        </div>
        <ul className="edu-facts">
          <li><strong>GPA:</strong> 8.0 / 10</li>
          <li><strong>Class XII:</strong> 94.2%</li>
          <li><strong>Class X:</strong> 86.6%</li>
        </ul>
      </motion.div>
    </motion.section>
  )
}

function SkillsSection() {
  const reduce = useReducedMotion()
  const skillsRef = useRef()
  const skills = [
    { name: 'HTML', icon: '/icons/html.svg' },
    { name: 'CSS', icon: '/icons/css.svg' },
    { name: 'JavaScript', icon: '/icons/javascript.svg' },
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Next.js', icon: '/icons/nextjs.svg' },
    { name: 'Tailwind', icon: '/icons/tailwindcss.svg' },
    { name: 'Node.js', icon: '/icons/nodejs.svg' },
    { name: 'Express', icon: '/icons/express.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'SQL', icon: '/icons/sql.svg' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg' },
    { name: 'GitHub', icon: '/icons/github.svg' },
  ]
  const extraTools = ['Java', 'Vue.js', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Git', 'Postman', 'ESLint', 'CI/CD', 'REST APIs']

  return (
    <motion.section
      className="skills-section honeycomb-skills portfolio-section"
      id="skills"
      ref={skillsRef}
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <motion.div
        className="section-heading centered"
        variants={headingStagger(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        <motion.div className="section-kicker" variants={headingItem(reduce)}>Stack and tooling</motion.div>
        <motion.h2 className="work-title" variants={headingItem(reduce)}>
          Skills<span className="section-accent" />
        </motion.h2>
        <motion.p className="section-lead centered-text" variants={headingItem(reduce)}>
          Core technologies I use in production, plus supporting tools from my résumé.
        </motion.p>
      </motion.div>
      <motion.div
        className="skills-row"
        variants={staggerContainer(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {skills.slice(0, 7).map((skill) => (
          <motion.div key={skill.name} variants={fadeUp(reduce)}>
            <SkillIcon3D icon={skill.icon} name={skill.name} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="skills-row skills-row-offset"
        variants={staggerContainer(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {skills.slice(7).map((skill) => (
          <motion.div key={skill.name} variants={fadeUp(reduce)}>
            <SkillIcon3D icon={skill.icon} name={skill.name} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="skill-chips-wrap"
        variants={fadeUp(reduce, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {extraTools.map((t) => (
          <span key={t} className="tech-chip soft">{t}</span>
        ))}
      </motion.div>
    </motion.section>
  )
}

function WorkExperience() {
  const reduce = useReducedMotion()
  const workRef = useRef()

  const experiences = [
    {
      title: 'Software Developer',
      company: 'Jaypee Power Ventures Ltd. · Guna, MP',
      logo: jpvlLogo,
      date: 'Mar 2025 – Present',
      description: [
        'Contributing to software systems in a large-scale enterprise focused on power generation and distribution.',
        'Developed and maintained backend services with automated validation, improving reliability and reducing production defects.',
        'Implemented service-level checks and structured debugging workflows to minimize regressions and stabilize releases.',
        'Collaborated across the SDLC with demos and client walkthroughs to align engineering outcomes with business needs.',
      ],
    },
    {
      title: 'Software Developer Intern',
      company: 'Digital Umbrella · Remote',
      logo: digitalUmbrellaLogo,
      date: 'Jun 2024 – Jul 2024',
      description: [
        'Built a responsive e-commerce clothing experience with Next.js and Tailwind CSS.',
        'Shipped dynamic catalog sections, product layouts, and Swiper.js carousels for stronger engagement.',
        'Focused on reusable components, performance, and cross-device UX.',
        'Project URL: intern-ecommerce-project-theta.vercel.app',
      ],
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Ministry of Defence (DRDO), DMSRDE · Kanpur, U.P.',
      logo: drdoLogo,
      date: 'May 2024 – Jul 2024',
      description: [
        'Developed the PCB Inventory Control System under the guidance of Shri Sanjeev Kumar, Scientist \'F\', at DMSRDE (DRDO) Kanpur.',
        'End-to-end inventory for PCB fabrication: stock, tool usage logs, purchase records, delivery tracking, and admin/user dashboards with Next.js and Tailwind CSS.',
        'Backend with Node.js and MongoDB: secure authentication, PDF upload and parsing (Multer), and status workflows for production use.',
        'Project URL: pcb-inventory.vercel.app',
      ],
    },
  ]

  const cardHeight = 520
  const timelineMinHeight = experiences.length * cardHeight + 280

  return (
    <motion.section
      className="work-section portfolio-section"
      ref={workRef}
      id="work"
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <motion.div
        variants={headingStagger(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        <motion.div className="section-kicker" variants={headingItem(reduce)}>Professional path</motion.div>
        <motion.h2 className="work-title" variants={headingItem(reduce)}>
          Experience<span className="section-accent" />
        </motion.h2>
      </motion.div>
      <div className="timeline timeline-centered" style={{ minHeight: `${timelineMinHeight}px` }}>
        <div className="timeline-line timeline-line-centered" />
        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0
          const cardTop = `calc(${i * cardHeight}px + 40px)`
          return (
            <React.Fragment key={exp.title + exp.company}>
              <motion.div
                className="timeline-circle timeline-circle-centered"
                style={{ top: `calc(${i * cardHeight}px + 40px + 32px)`, left: '50%', transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.06, ease: easePremium }}
              >
                <img src={exp.logo} alt="" className="timeline-logo" />
              </motion.div>
              <motion.div
                className={`timeline-card timeline-card-centered glass-panel${isLeft ? ' left' : ' right'}`}
                style={{ top: cardTop }}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.08, ease: easePremium }}
              >
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <div className="timeline-company">{exp.company}</div>
                    <div className="timeline-date">{exp.date}</div>
                  </div>
                  <ul className="timeline-desc">
                    {exp.description.map((d, j) => (
                      <li key={j}>
                        {d.startsWith('Project URL:') ? (
                          <a href={`https://${d.split('Project URL:')[1].trim()}`} target="_blank" rel="noopener noreferrer">{d.replace('Project URL: ', '')}</a>
                        ) : (
                          d
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </React.Fragment>
          )
        })}
      </div>
    </motion.section>
  )
}

function ContactSection() {
  const reduce = useReducedMotion()
  return (
    <motion.section
      className="contact-section portfolio-section"
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      variants={fadeUp(reduce)}
    >
      <motion.div
        className="section-heading centered tight"
        variants={headingStagger(reduce)}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
      >
        <motion.div className="section-kicker" variants={headingItem(reduce)}>
          Get in touch
        </motion.div>
        <motion.h2 className="contact-title" variants={headingItem(reduce)}>
          Contact<span className="section-accent" />
        </motion.h2>
      </motion.div>
      <div className="contact-section-body">
        <motion.div
          className="contact-details-wrap"
          variants={fadeUp(reduce, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <ContactDetails />
        </motion.div>
        <motion.div
          className="contact-3d-illustration"
          variants={fadeUp(reduce, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          aria-hidden
        >
          <Contact3DIcon />
        </motion.div>
      </div>
    </motion.section>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark')
      return 'dark'
    }
    return savedTheme
  })
  const [ready, setReady] = useState(false)
  const [activeNav, setActiveNav] = useState('')
  const [finePointer, setFinePointer] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches,
  )

  const handleLoaderDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    const fn = () => setFinePointer(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar')
      if (navbar) {
        if (window.scrollY > 10) navbar.classList.add('scrolled')
        else navbar.classList.remove('scrolled')
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    const ids = ['overview', 'projects', 'work', 'education', 'skills', 'contact']
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit?.target?.id) setActiveNav(hit.target.id)
      },
      { root: null, rootMargin: '-12% 0px -48% 0px', threshold: [0.08, 0.16, 0.28, 0.4] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ready])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const cursorEnabled = !reduceMotion && finePointer

  return (
    <>
      <AnimatePresence mode="wait">
        {!ready && (
          <PageLoader key="page-loader" reduce={!!reduceMotion} onComplete={handleLoaderDone} />
        )}
      </AnimatePresence>
      <div className={`portfolio-root ${theme}`}>
        <a href="#overview" className="skip-link">
          Skip to content
        </a>
        <div className="ambient-grid" aria-hidden />
        <div className="mesh-gradient" aria-hidden />
        <div className="film-grain" aria-hidden />
        <CursorGlow enabled={cursorEnabled && ready} />
        <Navbar theme={theme} toggleTheme={toggleTheme} activeNav={activeNav} />
        <main className={`portfolio-content scrollable${ready ? ' is-ready' : ''}`}>
          <Hero />
          <Introduction />
          <ProjectsSection />
          <WorkExperience />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <ScrollToTop theme={theme} />
        <footer className="custom-footer">
          <div className="footer-content">
            <span className="footer-copyright">&copy; {new Date().getFullYear()} Anshika Sharma</span>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/anshika-sharma-3aa4241b7" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="footer-icon-link">
                <svg className="footer-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </a>
              <a href="https://github.com/anshikasharma148" target="_blank" rel="noopener noreferrer" title="GitHub" className="footer-icon-link">
                <svg className="footer-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.instagram.com/anshika_sharma_128/profilecard/?igsh=MTRnM2xyNmcxemtpcg==" target="_blank" rel="noopener noreferrer" title="Instagram" className="footer-icon-link">
                <svg className="footer-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="tel:8707657707" title="Phone" className="footer-icon-link">
                <svg className="footer-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.07 22 2 13.93 2 4.5c0-.55.45-1 1-1H6.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.13.34.04.73-.24 1.01l-2.2 2.2z"/></svg>
              </a>
              <a href="mailto:its.anshika12003@gmail.com" title="Email" className="footer-icon-link">
                <svg className="footer-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
