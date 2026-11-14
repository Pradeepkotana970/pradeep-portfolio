import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const projectData = [
  {
    image: "/project-media/skillsynth-logo.jpeg",
    category: "Internship Project",
    role: "Full Stack Developer Intern",
    title: "SKILLSYNTH",
    subtitle: "Full Stack Development",
    description:
      "Contributed to frontend and backend development during my internship at SkillSynth, gaining practical experience working with the functionality of a full-stack platform.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Python"],
    link: null,
    github: null,
  },
  {
    image: "/project-media/smart-monitoring.png",
    category: "AI / Machine Learning",
    role: "Solo Developer",
    title: "AI-DRIVEN SMART MONITORING",
    subtitle: "Face Recognition & Activity Detection",
    description:
      "An AI-driven smart monitoring system using face recognition and suspicious activity detection.",
    tags: ["Python"],
    link: null,
    github: null,
  },
  {
    image: "/project-media/smart-crop.png",
    category: "Machine Learning",
    role: "Solo Developer",
    title: "SMART CROP YIELD PREDICTION",
    subtitle: "Agricultural ML Dashboard",
    description:
      "A machine learning-based crop yield prediction system with an interactive dashboard for agricultural data analysis and prediction.",
    tags: ["Python", "Streamlit", "Random Forest", "Scikit-learn", "Plotly"],
    link: null,
    github: null,
  },
];

const Portfolio = () => {
  return (
    <section id="projects" className="bg-[#020202] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/40 transition-colors duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3] rounded-[1.5rem] m-2 bg-black/60 flex items-center justify-center">
              <img
                src={project.image}
                alt={`${project.title} – Project by Pradeep Kotana`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div
                style={{ display: 'none' }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/40 to-black/60 text-blue-300"
              >
                <span className="text-4xl mb-2">💻</span>
                <span className="text-xs font-mono tracking-widest uppercase opacity-60">{project.title}</span>
              </div>
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 bg-black/70 text-blue-400 border border-blue-500/30 rounded-full backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-7 flex flex-col flex-1">
              {/* Role */}
              <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">
                {project.role}
              </p>

              {/* Title & Subtitle */}
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-blue-400 font-mono mb-4 tracking-wide">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10"
                  >
                    <FiGithub size={18} />
                  </a>
                ) : (
                  <span
                    title="Repository not publicly available"
                    className="p-3 bg-white/5 text-gray-600 rounded-xl border border-white/5 cursor-not-allowed"
                  >
                    <FiGithub size={18} />
                  </span>
                )}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10"
                  >
                    <FiExternalLink size={18} />
                  </a>
                ) : (
                  <span
                    title="Live demo not available"
                    className="p-3 bg-white/5 text-gray-600 rounded-xl border border-white/5 cursor-not-allowed"
                  >
                    <FiExternalLink size={18} />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
