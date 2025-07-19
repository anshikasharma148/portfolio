import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import jpvlLogo from './assets/jpvl-logo.jpg';
import digitalUmbrellaLogo from './assets/digital-umbrella-logo.png';
import drdoLogo from './assets/drdo-logo.jpg';
import React from 'react';
import SkillIcon3D from './components/SkillIcon3D';
import ContactForm from './components/ContactForm';
import Contact3DIcon from './components/Contact3DIcon';
import portImage from './assets/portimage.jpeg';
import cvPDF from './assets/anshika-sharma-cv.pdf';

function AnimatedBackground({ theme, variant }) {
  if (variant === 'particles') {
    const bgColor = theme === 'light' ? '#f7f7fa' : '#1a1a2e';
    return (
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.7} />
        {/* Background plane for theme color */}
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[40, 24, 1, 1]} />
          <meshBasicMaterial color={bgColor} transparent opacity={0.98} />
        </mesh>
        <ParticlesBG theme={theme} />
      </Canvas>
    );
  }
  // fallback: flat color
  const bgColor = theme === 'light' ? '#f7f7fa' : '#1a1a2e';
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100vw', height: '100vh' }}>
      <ambientLight intensity={1} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[20, 12, 1, 1]} />
        <meshBasicMaterial 
          color={bgColor}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Canvas>
  )
}

function ParticlesBG({ theme }) {
  const color = theme === 'light' ? '#222' : '#fff';
  const numParticles = 200;
  const particles = useMemo(() => {
    return Array.from({ length: numParticles }, () => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ],
      speed: [
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ]
    }));
  }, []);
  const meshRefs = useRef([]);
  useFrame(() => {
    meshRefs.current.forEach((ref, i) => {
      if (ref) {
        // Animate position
        ref.position.x += particles[i].speed[0];
        ref.position.y += particles[i].speed[1];
        ref.position.z += particles[i].speed[2];
        // Wrap around
        if (ref.position.x > 8) ref.position.x = -8;
        if (ref.position.x < -8) ref.position.x = 8;
        if (ref.position.y > 5) ref.position.y = -5;
        if (ref.position.y < -5) ref.position.y = 5;
        if (ref.position.z > 4) ref.position.z = -4;
        if (ref.position.z < -4) ref.position.z = 4;
      }
    });
  });
  return (
    <>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} ref={el => meshRefs.current[i] = el}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar new-navbar">
      <div className="navbar-left">
        <span className="logo-circle">A</span>
        <span className="navbar-title">Anshika Sharma</span>
      </div>
      <div className="navbar-links">
        <a href="#overview">About</a>
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle light/dark mode">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  // Typewriter animation for name
  const fullName = 'Anshika Sharma';
  const [displayName, setDisplayName] = useState('');
  const [typing, setTyping] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (index < fullName.length) {
        timeout = setTimeout(() => {
          setDisplayName(fullName.slice(0, index + 1));
          setIndex(index + 1);
        }, 120);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayName(fullName.slice(0, index - 1));
          setIndex(index - 1);
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(true), 600);
      }
    }
    return () => clearTimeout(timeout);
  }, [typing, index, fullName]);

  return (
    <section className="hero-section new-hero-section hero-left-layout">
      <div className="hero-content hero-content-left">
        <h1>
          <span className="hero-hi">Hi, I'm</span>
          {' '}
          <span className="hero-name">{displayName}<span className="type-cursor">|</span></span>
        </h1>
        <h2 className="hero-subtitle" style={{ fontFamily: 'Fira Mono, monospace', fontWeight: 500 }}>
          Building modern web apps & software solutions.
        </h2>
        <a
          href={cvPDF}
          className="cta-btn hero-cv-btn"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '1.2rem', display: 'inline-block' }}
        >
          Download CV
        </a>
      </div>
      <div className="hero-image-3d-container">
        <div className="hero-image-glow-ring">
          <img src={portImage} alt="Anshika Sharma" className="hero-image-3d" />
        </div>
      </div>
      <div className="hero-scroll-indicator bottom-scroll">
        <span className="mouse-icon"></span>
      </div>
    </section>
  )
}

function Introduction() {
  const [visible, setVisible] = useState(false)
  const introRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (introRef.current) observer.observe(introRef.current)
    return () => { if (introRef.current) observer.unobserve(introRef.current) }
  }, [])

  const cards = [
    { title: 'Web Developer', icon: '🌐' },
    { title: 'Software Developer', icon: '💻' },
    { title: 'MERN Stack Developer', icon: '⚡' },
    { title: 'Full Stack Developer', icon: '🚀' },
    { title: 'REST API Developer', icon: '🔗' },
  ]
  return (
    <section className={`intro-section section-animate${visible ? ' visible' : ''}`} ref={introRef} id="overview">
      <div className="intro-inner">
        <div className="intro-label">INTRODUCTION</div>
        <h2 className="intro-title">Overview<span className="section-dot"></span></h2>
        <p className="intro-desc">
          I'm Anshika Sharma, a dedicated Software Developer with hands-on experience in building full-stack web applications. I specialize in React.js, Next.js, Tailwind CSS, and Three.js on the frontend, and Node.js, Express.js, MongoDB, and MySQL on the backend. With a strong command of HTML, CSS, JavaScript, and TypeScript, I focus on creating clean, responsive, and efficient solutions that deliver real impact.
        </p>
      </div>
      <div className="intro-cards">
        {cards.map((card, i) => (
          <div key={card.title} className={`intro-card${visible ? ' show' : ''}`} style={{ transitionDelay: `${i * 0.18 + 0.2}s` }}>
            <div className="intro-card-icon">{card.icon}</div>
            <div className="intro-card-title">{card.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const skillsRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (skillsRef.current) observer.observe(skillsRef.current)
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current) }
  }, [])
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
    { name: 'C++', icon: '/icons/cpp.svg' },
    { name: 'GitHub', icon: '/icons/github.svg' },
  ];
  return (
    <section className={`skills-section honeycomb-skills section-animate${visible ? ' visible' : ''}`} id="skills" ref={skillsRef}>
      <div className="skills-row">
        {skills.slice(0, 7).map(skill => (
          <SkillIcon3D key={skill.name} icon={skill.icon} />
        ))}
      </div>
      <div className="skills-row skills-row-offset">
        {skills.slice(7).map(skill => (
          <SkillIcon3D key={skill.name} icon={skill.icon} />
        ))}
      </div>
    </section>
  );
}

function WorkExperience() {
  const [visible, setVisible] = useState(false)
  const [showCards, setShowCards] = useState([false, false, false])
  const workRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
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
    <section className={`work-section section-animate-left${visible ? ' visible' : ''}`} ref={workRef} id="work">
      <div className="work-label">WHAT I HAVE DONE SO FAR</div>
      <h2 className="work-title">Work Experience<span className="section-dot"></span></h2>
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
              <div className={`timeline-card timeline-card-centered${isLeft ? ' left' : ' right'}${visible ? ' show' : ''}`} style={{ top: cardTop }}>
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

function ContactSection() {
  const [visible, setVisible] = useState(false)
  const contactRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (contactRef.current) observer.observe(contactRef.current)
    return () => { if (contactRef.current) observer.unobserve(contactRef.current) }
  }, [])
  return (
    <section className={`contact-section-flex section-animate-left${visible ? ' visible' : ''}`} id="contact" ref={contactRef}>
      <ContactForm />
      <div className="contact-3d-illustration">
        <Contact3DIcon />
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    }
    return savedTheme;
  });
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <div className={`portfolio-root ${theme}`}>
      <AnimatedBackground theme={theme} variant="particles" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="portfolio-content scrollable">
        <Hero />
        <Introduction />
        <WorkExperience />
        <SkillsSection />
        <ContactSection />
      </main>
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
  )
}

export default App
