import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

  const frameCount = 300;
  const currentFrame = (index) => `/pradeep-new-frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;
  
  const imagesRef = useRef([]);
  // We use an object to track the frame so GSAP can animate the value smoothly
  const seqRef = useRef({ frame: 0 });

  useEffect(() => {
    // Preload sequence
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current.push(img);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1920;
    canvas.height = 1080;

    const render = () => {
        if (!canvasRef.current || !imagesRef.current.length) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Clamp frame just in case
        let frameIdx = Math.round(seqRef.current.frame);
        if (frameIdx >= frameCount) frameIdx = frameCount - 1;
        
        const img = imagesRef.current[frameIdx];
        if (img && img.complete && img.naturalHeight !== 0) {
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            // Clean bottom-right Gemini sparkle watermark
            ctx.fillStyle = '#020202';
            ctx.fillRect(x + 1120 * scale, y + 560 * scale, 80 * scale, 80 * scale);
        }

        // Update state only if threshold is crossed to minimize re-renders
        setCurrentFrameIdx(frameIdx);
    };


    // Render initial 0th frame immediately so hero appears directly
    render();

    // --- 1. SYSTEM BOOT OPENING EXPERIENCE (Runs on Mount) ---
    const bootTl = gsap.timeline();

    // Boot visuals
    bootTl.fromTo('.noise-overlay', { opacity: 0 }, { opacity: 0.15, duration: 0.5, ease: "none" }, 0);
    
    // Navbar slide in
    bootTl.fromTo('nav', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);

    // Initial subtle frame turn
    bootTl.to(seqRef.current, { frame: 10, snap: "frame", duration: 1.2, ease: "power1.inOut", onUpdate: render }, 0.2);

    // Social Icons Bottom Left
    bootTl.fromTo('.social-icon', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "none" }, 0.2);

    // --- 2. MAIN SCROLL CONTINUATION ---
    // User scroll takes over from whatever frame bootTl left off at, up to 239.
    const tlScroll = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1
        }
    });

    tlScroll.to(seqRef.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1, 
        onUpdate: render
    });

    // Content stays fixed. No aggressive re-animations. 
    // Just a clean sharp fade out at the very end of the scroll.
    tlScroll.fromTo('.portfolio-ui', 
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(5px)", duration: 0.1, ease: "none" }, 
        0.9
    );
    
    tlScroll.fromTo(canvas, 
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(10px)", duration: 0.1, ease: "none" }, 
        0.9
    );

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  const titleText = "PRADEEP KOTANA";

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide">
        
        {/* Loading State */}
        {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202]">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">&gt; INITIALIZING_CORE_SYSTEM</div>
                <div className="w-64 h-[1px] bg-white/10 overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${loadingProgress}%` }}></div>
                </div>
            </div>
        )}

        {/* --- BACKGROUND EFFECTS --- */}
        {/* Subtle grid lines */}
        <div className="portfolio-ui absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Static noise grain */}
        <div className="portfolio-ui noise-overlay absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* --- SOCIAL LINKS --- */}
        <div className="portfolio-ui absolute bottom-12 left-8 md:left-12 z-[60] flex flex-col space-y-5">
            <a href="https://github.com/Pradeepkotana970" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* GitHub */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/kotana-pradeep" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* LinkedIn */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
        </div>

        {/* --- CANVAS --- */}
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />

        {/* --- PORTFOLIO TEXT OVERLAY --- */}
        <AnimatePresence>
            {loaded && (
                <div className="portfolio-ui absolute inset-0 z-[50] pointer-events-none flex flex-col md:flex-row justify-between items-center md:items-center px-8 md:px-[15%] lg:px-[18%] pt-32 pb-16 md:pt-0 pb-0">
                    
                    {/* LEFT SIDE: Name and Role */}
                    <div className="w-full md:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                        {currentFrameIdx >= 100 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mb-4"
                            >
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-[0.1em] uppercase leading-none" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                                    {titleText}
                                </h1>
                            </motion.div>
                        )}
                        
                        {currentFrameIdx >= 150 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="relative inline-block"
                            >
                                <h2 className="text-sm md:text-md lg:text-lg font-mono text-gray-300 tracking-[0.2em] uppercase pb-2">
                                    B.TECH CSE STUDENT • SOFTWARE DEVELOPER • TECHNOLOGY ENTHUSIAST
                                </h2>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/60"></div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Description and Button */}
                    <div className="w-full md:w-[35%] flex flex-col items-center md:items-start text-center md:text-left mt-16 md:mt-0 md:pl-8">
                        {currentFrameIdx >= 200 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mb-8"
                            >
                                <p className="text-gray-400 text-sm md:text-sm lg:text-base font-light tracking-wide leading-relaxed">
                                    I'm Pradeep Kotana, B.Tech Computer Science and Engineering student at B.V. Raju Institute of Technology. I'm passionate about programming, software development, and creating useful digital experiences.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
}
