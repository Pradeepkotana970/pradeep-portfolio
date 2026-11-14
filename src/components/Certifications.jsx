import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiAward, FiX, FiExternalLink, FiDownload, FiFilter,
  FiCalendar, FiTag, FiZoomIn
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// ─── Certificate Data ─────────────────────────────────────────────────────────
const certificates = [
  {
    id: 'oracle',
    title: 'Oracle Cloud Infrastructure Certified AI Foundations Associate',
    issuer: 'Oracle',
    issuerShort: 'Oracle',
    date: '28 June 2026',
    type: 'Professional Certification',
    category: 'AI & Cloud',
    pdf: '/certificates/oracle.pdf',
    accent: '#f80000',       // Oracle red
    description: 'Industry-recognised credential validating foundational knowledge of AI and ML concepts on Oracle Cloud Infrastructure.'
  },
  {
    id: 'ibm-skill',
    title: 'AICTE | IBM SkillsBuild Gen AI & Cloud Computing Internship',
    issuer: 'IBM SkillsBuild / BharatCares',
    issuerShort: 'IBM SkillsBuild',
    date: '29 June 2026',
    type: 'Internship',
    category: 'AI & Cloud',
    pdf: '/certificates/ibm-skill.pdf',
    accent: '#0f62fe',       // IBM blue
    description: 'Completed the AICTE-approved internship programme covering Generative AI and Cloud Computing through IBM SkillsBuild.'
  },
  {
    id: 'ibm-gen-ai',
    title: 'Getting Started with Generative AI',
    issuer: 'IBM SkillsBuild',
    issuerShort: 'IBM SkillsBuild',
    date: '25 June 2026',
    type: 'Course Completion',
    category: 'AI & Cloud',
    pdf: '/certificates/ibm-generative-ai.pdf',
    accent: '#0f62fe',
    description: 'Foundational course on Generative AI concepts, tools, and practical applications offered by IBM SkillsBuild.'
  },
  {
    id: 'deloitte',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte / Forage',
    issuerShort: 'Deloitte · Forage',
    date: '19 July 2026',
    type: 'Job Simulation',
    category: 'Data Analytics',
    pdf: '/certificates/deloitte-data-analytics.pdf',
    accent: '#86bc25',       // Deloitte green
    description: 'Completed Deloitte\'s Data Analytics virtual job simulation on Forage, applying analytical skills to real-world business scenarios.'
  },
  {
    id: 'python1',
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    issuerShort: 'Cisco NetAcad',
    date: '20 May 2025',
    type: 'Course Completion',
    category: 'Programming',
    pdf: '/certificates/python-essentials-1.pdf',
    accent: '#1ba0d7',       // Cisco blue
    description: 'Completed Python Essentials 1, covering core Python programming fundamentals through Cisco Networking Academy.'
  },
  {
    id: 'python2',
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    issuerShort: 'Cisco NetAcad',
    date: '20 May 2025',
    type: 'Course Completion',
    category: 'Programming',
    pdf: '/certificates/python-essentials-2.pdf',
    accent: '#1ba0d7',
    description: 'Completed Python Essentials 2, advancing into object-oriented programming and intermediate Python through Cisco Networking Academy.'
  },
  {
    id: 'simplilearn',
    title: 'Introduction to Generative AI Studio',
    issuer: 'Simplilearn SkillUp',
    issuerShort: 'Simplilearn',
    date: '23 July 2025',
    type: 'Course Completion',
    category: 'AI & Cloud',
    pdf: '/certificates/simplilearn-gen-ai-studio.pdf',
    accent: '#ff6b35',       // Simplilearn orange
    description: 'Introductory course on Generative AI Studio tools and workflows, issued by Simplilearn SkillUp.'
  },
  {
    id: 'nptel',
    title: 'Soft Skills – Elite',
    issuer: 'NPTEL',
    issuerShort: 'NPTEL',
    date: 'July – October 2026',
    type: 'NPTEL Certification',
    category: 'Professional Development',
    pdf: '/certificates/nptel-soft-skills.pdf',
    accent: '#7c3aed',       // Purple
    description: 'Elite-tier NPTEL certification in Soft Skills. Score: 62% · 4 recommended credits.'
  }
];

const FILTER_CATEGORIES = ['All', 'AI & Cloud', 'Programming', 'Data Analytics', 'Professional Development'];

// Badge colour by type
const typeBadgeStyle = {
  'Professional Certification': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'Internship':                 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Course Completion':          'bg-green-500/15 text-green-300 border-green-500/30',
  'Job Simulation':             'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'NPTEL Certification':        'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
};

// ─── PDF Modal ────────────────────────────────────────────────────────────────
function PdfModal({ cert, onClose }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#09090b] border border-white/15 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.2)] flex flex-col"
        style={{ maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#060608] flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 mr-4">
            <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400 flex-shrink-0">
              <FiAward size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight truncate">{cert.title}</p>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{cert.issuer} · {cert.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Open in new tab */}
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/30 rounded-lg transition-all duration-200"
              title="Open in new tab"
            >
              <FiExternalLink size={12} />
              <span className="hidden sm:inline">Open</span>
            </a>
            {/* Download */}
            <a
              href={cert.pdf}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/30 rounded-lg transition-all duration-200"
              title="Download PDF"
            >
              <FiDownload size={12} />
              <span className="hidden sm:inline">Download</span>
            </a>
            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-all"
              aria-label="Close"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* PDF iframe viewer */}
        <div className="flex-1 bg-[#111113] overflow-hidden" style={{ minHeight: '60vh' }}>
          <iframe
            src={cert.pdf + '#view=FitH&toolbar=1'}
            title={cert.title}
            className="w-full h-full border-0"
            style={{ minHeight: '60vh', background: '#111113' }}
          />
        </div>

        {/* Modal footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#060608] flex-shrink-0 flex items-center justify-between gap-3">
          <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider border ${typeBadgeStyle[cert.type] || 'bg-gray-800 text-gray-400 border-white/10'}`}>
            {cert.type}
          </span>
          <p className="text-gray-500 text-xs font-light leading-relaxed hidden sm:block flex-1 ml-4">
            {cert.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertCard({ cert, onView, index }) {
  return (
    <div
      className="cert-card group relative bg-[#09090b] border border-white/8 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col"
      style={{ '--cert-accent': cert.accent }}
      onClick={() => onView(cert)}
    >
      {/* Top accent stripe */}
      <div
        className="h-[2px] w-full flex-shrink-0 transition-all duration-300"
        style={{ background: cert.accent, opacity: 0.7 }}
      />

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Row 1 — icon + type badge */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div
            className="p-2.5 rounded-lg border flex-shrink-0"
            style={{ background: cert.accent + '14', borderColor: cert.accent + '30' }}
          >
            <FiAward size={18} style={{ color: cert.accent }} />
          </div>
          <span
            className={`px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider border flex-shrink-0 ${typeBadgeStyle[cert.type] || 'bg-gray-800 text-gray-400 border-white/10'}`}
          >
            {cert.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-snug mb-1 group-hover:text-blue-100 transition-colors line-clamp-3 flex-1">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="text-gray-400 font-mono text-[10px] uppercase tracking-wider mb-4">
          {cert.issuerShort}
        </p>

        {/* Date + category row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <FiCalendar size={10} />
            <span className="font-mono text-[10px] tracking-wider">{cert.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FiTag size={9} />
            <span className="font-mono text-[9px] uppercase tracking-wider">{cert.category}</span>
          </div>
        </div>
      </div>

      {/* Hover CTA bar */}
      <div className="flex items-center justify-center gap-2 py-2.5 bg-white/[0.03] border-t border-white/[0.06] group-hover:bg-blue-500/8 group-hover:border-blue-500/20 transition-all duration-300">
        <FiZoomIn size={12} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-blue-400 transition-colors">
          View Certificate
        </span>
      </div>

      {/* Blue glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${cert.accent}22` }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Certifications() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const gridRef     = useRef(null);

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCert, setActiveCert]     = useState(null);

  const filtered = activeFilter === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeFilter);

  // Scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      if (gridRef.current) {
        gsap.fromTo(
          '.cert-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  const handleFilter = useCallback((cat) => {
    setActiveFilter(cat);
    setTimeout(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 10);
  }, []);

  const totalCount = certificates.length;

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#020202] text-white overflow-hidden scroll-mt-24"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 20%, transparent 25%, rgba(0,0,0,0.85) 100%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-5">
            <FiAward size={11} className="text-blue-400" />
            <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">
              Credentials & Achievements
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-5">
            Certifications<span className="text-blue-500">.</span>
          </h2>

          <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-7" />

          <p className="max-w-2xl mx-auto text-gray-400 font-light text-base md:text-lg leading-relaxed">
            Continuous learning, technical certifications and professional achievements.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-3xl font-black text-white">{totalCount}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Total</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">4</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Platforms</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">2025–26</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">Period</p>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-2.5 mb-12">
          <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[10px] uppercase tracking-widest mr-2">
            <FiFilter size={11} className="text-blue-400" />
            <span>Filter:</span>
          </div>
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.35)] scale-105'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-blue-500/40 hover:text-white'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 opacity-60">
                  ({certificates.filter(c => c.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} onView={setActiveCert} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600 font-mono text-sm">
            No certificates in this category.
          </div>
        )}

        {/* ── COUNT LINE ── */}
        <div className="mt-10 text-center">
          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            Showing {filtered.length} of {totalCount} certificates
          </span>
        </div>

      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.05] z-10" />

      {/* ── PDF MODAL ── */}
      {activeCert && (
        <PdfModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  );
}
