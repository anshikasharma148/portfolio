import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import jpvlLogo from './assets/jpvl-logo.jpg';
import digitalUmbrellaLogo from './assets/digital-umbrella-logo.png';
import drdoLogo from './assets/drdo-logo.jpg';
import React from 'react';

function AnimatedBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100vw', height: '100vh' }}>
      <ambientLight intensity={1} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[20, 12, 1, 1]} />
        <meshBasicMaterial 
          color="#1a1a2e"
          transparent
          opacity={0.8}
        />
      </mesh>
    </Canvas>
  )
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  return (
    <nav className="navbar new-navbar">
      <div className="navbar-left">
        <span className="logo-circle">A</span>
        <span className="navbar-title">Anshika Sharma — 3D Portfolio</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#about">About</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero-section new-hero-section center-hero">
      <div className="hero-content">
        <h1><span className="hero-hi">Hi, I'm</span> <span className="hero-name">Anshika Sharma</span></h1>
        <h2 className="hero-subtitle">I develop 3D visuals, user interfaces and web applications</h2>
      </div>
      <div className="hero-scroll-indicator bottom-scroll">
        <span className="mouse-icon"></span>
      </div>
    </section>
  )
}

function Introduction() {
  const [showSection, setShowSection] = useState(false)
  const [showCards, setShowCards] = useState([false, false, false, false, false])
  const introRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSection(true)
          // Trigger card animations after section is visible
          const timers = [
            setTimeout(() => setShowCards(s => [true, false, false, false, false]), 400),
            setTimeout(() => setShowCards(s => [true, true, false, false, false]), 700),
            setTimeout(() => setShowCards(s => [true, true, true, false, false]), 1000),
            setTimeout(() => setShowCards(s => [true, true, true, true, false]), 1300),
            setTimeout(() => setShowCards(s => [true, true, true, true, true]), 1600),
          ]
          return () => timers.forEach(clearTimeout)
        }
      },
      { threshold: 0.2 }
    )

    if (introRef.current) {
      observer.observe(introRef.current)
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current)
      }
    }
  }, [])

  const cards = [
    { title: 'Web Developer', icon: '🌐' },
    { title: 'Software Developer', icon: '💻' },
    { title: 'MERN Stack Developer', icon: '⚡' },
    { title: 'Full Stack Developer', icon: '🚀' },
    { title: 'REST API Developer', icon: '🔗' },
  ]
  return (
    <section className={`intro-section${showSection ? ' show' : ''}`} ref={introRef}>
      <div className="intro-inner">
        <div className="intro-label">INTRODUCTION</div>
        <h2 className="intro-title">Overview<span className="intro-dot">.</span></h2>
        <p className="intro-desc">
          I'm Anshika Sharma, a dedicated Software Developer with hands-on experience in building full-stack web applications. I specialize in React.js, Next.js, Tailwind CSS, and Three.js on the frontend, and Node.js, Express.js, MongoDB, and MySQL on the backend. With a strong command of HTML, CSS, JavaScript, and TypeScript, I focus on creating clean, responsive, and efficient solutions that deliver real impact.
        </p>
      </div>
      <div className="intro-cards">
        {cards.map((card, i) => (
          <div key={card.title} className={`intro-card${showCards[i] ? ' show' : ''}`} style={{ transitionDelay: `${i * 0.18 + 0.2}s` }}>
            <div className="intro-card-icon">{card.icon}</div>
            <div className="intro-card-title">{card.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WorkExperience() {
  const [showSection, setShowSection] = useState(false)
  const [showCards, setShowCards] = useState([false, false, false])
  const workRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSection(true)
          const timers = [
            setTimeout(() => setShowCards(s => [true, false, false]), 200),
            setTimeout(() => setShowCards(s => [true, true, false]), 500),
            setTimeout(() => setShowCards(s => [true, true, true]), 800),
          ]
          return () => timers.forEach(clearTimeout)
        }
      },
      { threshold: 0.2 }
    )
    if (workRef.current) observer.observe(workRef.current)
    return () => { if (workRef.current) observer.unobserve(workRef.current) }
  }, [])
  const experiences = [
    {
      title: 'Software Developer Intern',
      company: 'Control Development Centre (CDC), CIRD',
      logo: jpvlLogo,
      date: 'Mar 2025 – Present',
      description: [
        'Spearheading the development of a full-stack application to retrieve, process, and visualize real-time weather sensor data from Jaypee Hydro Power Plants using RESTful APIs.',
        'Building dedicated modules for Automated Weather System (AWS) and Early Warning System (EWS) to monitor live data from sensors like Geolux RS-2-300WL, Hydrocam, and dataloggers deployed at various hydro stations.',
        'Implementing features for data dashboarding, alert systems, and historical trend analysis, enabling disaster preparedness and remote monitoring.',
        'Leveraging technologies including Next.js, Node.js, MongoDB, Tailwind CSS, and Chart.js for responsive design and real-time data plotting.'
      ]
    },
    {
      title: 'Frontend Developer Intern (Stipend Based)',
      company: 'Digital Umbrella – Remote',
      logo: digitalUmbrellaLogo,
      date: 'Jun 2024 – Aug 2024',
      description: [
        'Designed and developed a feature-rich e-commerce platform focused on clothing products with a modern and responsive UI.',
        'Utilized Next.js and TypeScript to implement client-side routing, API integrations, and component-based architecture.',
        'Used Tailwind CSS for consistent and elegant styling across devices and Swiper.js for interactive product carousels.',
        'Integrated product listing, cart management, checkout flow, and basic authentication with session handling.',
        'Project URL: intern-ecommerce-project-theta.vercel.app'
      ]
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Ministry of Defence, Government of India (DRDO) – Kanpur, U.P.',
      logo: drdoLogo,
      date: 'May 2024 – Jul 2024',
      description: [
        'Designed and implemented a real-time inventory management system for tracking components used in PCB Fabrication Machines at DRDO\'s production unit.',
        'Created backend modules for managing stock entries, tool usage logs, purchase records, and delivery tracking, significantly improving inventory accuracy and process efficiency.',
        'Built intuitive frontend dashboards with Next.js and styled components using Tailwind CSS for admin and user-level interaction.',
        'Implemented secure authentication, PDF upload & parsing, and status tracking workflows using Node.js, MongoDB, and Multer.',
        'Project URL: pcb-inventory.vercel.app'
      ]
    }
  ]
  const cardHeight = 520; // Further increased for more vertical spacing
  return (
    <section className={`work-section${showSection ? ' show' : ''}`} ref={workRef}>
      <div className="work-label">WHAT I HAVE DONE SO FAR</div>
      <h2 className="work-title">Work Experience<span className="work-dot">.</span></h2>
      <div className="timeline timeline-centered">
        <div className="timeline-line timeline-line-centered"></div>
        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;
          const cardTop = `calc(${i * cardHeight}px + 40px)`;
          return (
            <React.Fragment key={exp.title}>
              <div className="timeline-circle timeline-circle-centered" style={{ top: `calc(${i * cardHeight}px + 40px + 32px)`, left: '50%', transform: 'translateX(-50%)' }}>
                <img src={exp.logo} alt={exp.company + ' logo'} className="timeline-logo" />
              </div>
              <div className={`timeline-card timeline-card-centered${isLeft ? ' left' : ' right'}${showCards[i] ? ' show' : ''}`} style={{ top: cardTop }}>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <div className="timeline-company">{exp.company}</div>
                    <div className="timeline-date">{exp.date}</div>
                  </div>
                  <ul className="timeline-desc">
                    {exp.description.map((d, j) => (
                      <li key={j}>{d.startsWith('Project URL:') ? <a href={`https://${d.split('Project URL:')[1].trim()}`} target="_blank" rel="noopener noreferrer">{d}</a> : d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="portfolio-root">
      <AnimatedBackground />
      <Navbar />
      <main className="portfolio-content scrollable">
        <Hero />
        <Introduction />
        <WorkExperience />
      </main>
    </div>
  )
}

export default App
