import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiCode, FiCpu } from "react-icons/fi";
import { 
  SiPython, 
  SiC, 
  SiCplusplus, 
  SiHtml5, 
  SiJavascript 
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  const [animKey, setAnimKey] = useState(0);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    const el = document.getElementById('about');
    if (!el) return;

    let wasInView = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!wasInView) {
              wasInView = true;
              const now = Date.now();
              if (now - lastTriggerRef.current > 400) {
                lastTriggerRef.current = now;
                setAnimKey((prev) => prev + 1);
              }
            }
          } else {
            wasInView = false;
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    const triggerReplay = () => {
      const now = Date.now();
      if (now - lastTriggerRef.current > 400) {
        lastTriggerRef.current = now;
        setAnimKey((prev) => prev + 1);
      }
    };

    window.addEventListener('replay-about-heading', triggerReplay);

    return () => {
      observer.disconnect();
      window.removeEventListener('replay-about-heading', triggerReplay);
    };
  }, []);

  const Tools = [
    { icon: <FaJava size={24} />, title: "Java" },
    { icon: <SiPython size={24} />, title: "Python" },
    { icon: <SiC size={24} />, title: "C" },
    { icon: <SiCplusplus size={24} />, title: "C++" },
    { icon: <SiHtml5 size={24} />, title: "HTML5" },
    { icon: <FaCss3Alt size={24} />, title: "CSS3" },
    { icon: <SiJavascript size={24} />, title: "JavaScript" },
  ];

  return (
    <div id="about" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-end font-sans tracking-wide py-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-16">
        
        {/* --- BG EFFECTS --- */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)" }}></div>

        {/* --- STATIC FRAME IMAGE (LEFT SIDE - FULL HEIGHT PORTRAIT) --- */}
        <div 
          className="absolute inset-y-0 left-0 w-[42%] lg:w-[40%] xl:w-[38%] 2xl:w-[36%] z-10 pointer-events-none overflow-hidden hidden lg:block" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)', 
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)' 
          }}
        >
            <img 
               src="/pradeep-about.png" 
               alt="Pradeep Kotana - Software Developer and Technology Enthusiast" 
               className="w-full h-full object-cover object-[center_top] opacity-90 contrast-105" 
            />
        </div>

        {/* --- CONTENT (RIGHT SIDE) --- */}
        <div className="relative z-[50] w-full flex justify-end items-center">
            {/* Main Content Pane */}
            <div className="w-full lg:w-[58%] xl:w-[56%] 2xl:w-[54%] ml-auto flex flex-col space-y-6 pointer-events-auto bg-black/40 backdrop-blur-sm p-6 md:p-8 lg:p-10 border border-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="space-y-3">
                    <p className="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.45em] font-semibold">
                        ABOUT ME
                    </p>
                    <motion.h2 
                        key={animKey}
                        variants={headingContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.35rem] xl:text-[2.9rem] 2xl:text-[3.4rem] font-black text-white tracking-tight leading-[1.08] uppercase"
                    >
                        <span className="block mb-1 sm:mb-1.5 text-gray-200">
                            {"ABOUT".split("").map((char, index) => (
                                <motion.span 
                                    key={`about-${index}`} 
                                    variants={charVariants} 
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="block whitespace-normal lg:whitespace-nowrap">
                            {"PRADEEP KOTANA".split("").map((char, index) => (
                                <motion.span 
                                    key={`name-${index}`} 
                                    variants={charVariants} 
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                            <motion.span 
                                variants={charVariants} 
                                className="inline-block text-blue-500 ml-0.5"
                            >
                                .
                            </motion.span>
                        </span>
                    </motion.h2>
                </div>

                {/* Bio Paragraph */}
                <div className="robotic-section">
                    <p className="text-gray-400 text-sm md:text-base lg:text-[1.05rem] font-light leading-relaxed max-w-2xl">
                        I'm Pradeep Kotana, a Computer Science and Engineering student at B.V. Raju Institute of Technology (BVRIT), Narasapur. I have a strong interest in programming, software development, and emerging technologies. I enjoy learning new technologies and building practical digital solutions.
                    </p>
                </div>

                {/* Cards Grid - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* CARD 1 – TECHNICAL EXPERTISE */}
                    <div className="group p-4 md:p-5 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <FiCode size={20} />
                                </div>
                                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                    Full-Stack
                                </span>
                            </div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
                                Technical Expertise
                            </h4>
                            <div className="space-y-2 text-[11px] leading-snug">
                                <div>
                                    <span className="text-gray-500 font-semibold block text-[10px] uppercase font-mono tracking-wider">
                                        Programming Languages
                                    </span>
                                    <span className="text-gray-300">Java, Python, C, C++</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 font-semibold block text-[10px] uppercase font-mono tracking-wider">
                                        Web Technologies
                                    </span>
                                    <span className="text-gray-300">HTML, CSS, JavaScript</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 font-semibold block text-[10px] uppercase font-mono tracking-wider">
                                        Development
                                    </span>
                                    <span className="text-gray-300">Frontend & Backend</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 – EDUCATION */}
                    <div className="group p-4 md:p-5 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <FiBookOpen size={20} />
                                </div>
                                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                    3rd Year
                                </span>
                            </div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
                                Education
                            </h4>
                            <div className="space-y-1.5 text-[11px] leading-snug">
                                <p className="text-white font-bold text-sm tracking-wide">B.Tech</p>
                                <p className="text-blue-400 text-xs font-medium">Computer Science and Engineering</p>
                                <div className="pt-2 border-t border-white/5 mt-2">
                                    <p className="text-gray-300 font-medium">B.V. Raju Institute of Technology (BVRIT)</p>
                                    <p className="text-gray-500 text-[10px] font-mono mt-0.5">Narasapur, Telangana</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3 – PROFESSIONAL EXPERIENCE */}
                    <div className="group p-4 md:p-5 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <FiAward size={20} />
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    Internship
                                </span>
                            </div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">
                                Professional Experience
                            </h4>
                            <div className="space-y-1.5 text-[11px] leading-snug">
                                <p className="text-white font-bold text-xs uppercase tracking-wide">
                                    Full Stack Developer Intern
                                </p>
                                <p className="text-blue-400 text-[11px] font-medium font-mono">
                                    Organization: SkillSynth
                                </p>
                                <p className="text-gray-400 text-[11px] leading-relaxed pt-1">
                                    Worked across both frontend and backend development, contributing to web application development and building practical software solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IBM SkillsBuild Experience Entry */}
                <div className="p-3.5 md:p-4 bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                            <FiCpu size={16} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">IBM SkillsBuild</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-[10px] font-mono text-gray-500">Program Experience</span>
                            </div>
                            <h5 className="text-white font-medium text-xs sm:text-sm mt-0.5">Getting Started with Generative AI</h5>
                        </div>
                    </div>
                    <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1 text-[11px] font-mono pl-11 sm:pl-0">
                        <span className="text-gray-300">Completion date: 25 June 2026</span>
                        <span className="text-gray-500 text-[10px]">Credential ID: PLAN-BAEFCCAAD520</span>
                    </div>
                </div>

                {/* Tech Dock */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {Tools.map((tool) => (
                            <div key={tool.title} className="group relative p-3.5 bg-black/50 border border-white/5 hover:border-blue-500/50 transition-all rounded-xl flex items-center justify-center cursor-help">
                                <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                                    {tool.icon}
                                </div>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-mono py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[70] whitespace-nowrap shadow-xl">
                                    {tool.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
