import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'WORKS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contactme' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const sections = [
      { name: 'HOME', id: 'hero' },
      { name: 'ABOUT', id: 'about' },
      { name: 'SERVICES', id: 'services' },
      { name: 'PORTFOLIO', id: 'projects' },
      { name: 'CERTIFICATIONS', id: 'certifications' },
      { name: 'CONTACT', id: 'contactme' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedSection = sections.find((s) => s.id === entry.target.id);
          if (matchedSection) {
            setActiveLink(matchedSection.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, link) => {
    if (link.external) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setActiveLink(link.name);
    setIsMobileMenuOpen(false);

    if (link.href === '#hero' || link.name === 'HOME') {
      const el = document.getElementById('hero');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const targetId = link.href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (targetId === 'about') {
        window.dispatchEvent(new CustomEvent('replay-about-heading'));
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'py-3 bg-black/80 backdrop-blur-lg border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-12">
          
          {/* Logo & System Status (Left Side) */}
          <div className="flex items-center space-x-4"></div>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <ul className="flex space-x-6 lg:space-x-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 pb-1 group whitespace-nowrap ${
                      activeLink === link.name ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Blue Active Underline */}
                    <span
                      className={`absolute left-0 bottom-0 h-[1px] bg-blue-500 transition-all duration-300 origin-left ${
                        activeLink === link.name ? 'w-full scale-x-100 opacity-100' : 'w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors z-[110]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        {/* BG Grid for Mobile */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <ul className="relative z-10 flex flex-col space-y-8 text-center">
          {navLinks.map((link, index) => (
            <li 
              key={link.name} 
              className={`transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm tracking-[0.35em] uppercase font-mono transition-all duration-300 ${
                  activeLink === link.name ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-white/40 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile HUD label */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase">Navigation_Module_Active</div>
      </div>
    </>
  );
}
