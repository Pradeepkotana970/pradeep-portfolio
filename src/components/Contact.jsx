import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiLinkedin } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

  const frameCount = 160;
  const imagesRef = useRef([]);
  const seqRef = useRef({ frame: 0 });

  const currentFrame = (index) => `/image3/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  // 1. Preload Sequence
  useEffect(() => {
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

  // 2. GSAP Scroll and Render Logic (Hero Sync)
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Responsive Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      if (!canvas || !imagesRef.current.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let frameIdx = Math.round(seqRef.current.frame);
      if (frameIdx >= frameCount) frameIdx = frameCount - 1;

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      setCurrentFrameIdx(frameIdx);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Scroll Animation - Sync with Hero logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.2, // Smoother scrub
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(seqRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().filter(t => t.trigger === containerRef.current).forEach(t => t.kill());
    };
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      id="contactme"
      className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-mono select-none"
    >
      {/* 1. Loading Module (Ultra-high Z) */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020202]"
          >
            <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 animate-pulse">
              SYNCING_COMM_STREAM {loadingProgress}%
            </div>
            <div className="w-64 h-[2px] bg-cyan-950/30 overflow-hidden">
               <motion.div 
                 className="h-full bg-cyan-500" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cinematic Canvas Layer (Z-0) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 3. Aesthetic Overlays (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />


      {/* 5. Final Contact Phase: LET'S CONNECT with Phone & LinkedIn Cards */}
      <AnimatePresence>
        {loaded && currentFrameIdx >= 120 && (
          <motion.div
            key="final-connect-phase"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 w-full max-w-5xl px-6 pointer-events-auto"
          >
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-block px-4 py-1.5 border border-blue-500/40 bg-blue-500/10 backdrop-blur-md rounded-md mb-4">
                <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em] font-semibold">GET IN TOUCH</p>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                LET'S CONNECT<span className="text-blue-500">.</span>
              </h2>
              <div className="inline-block max-w-xl mx-auto backdrop-blur-md bg-black/50 border border-white/10 px-6 py-2.5 rounded-full">
                <p className="text-gray-300 font-light text-xs md:text-sm tracking-wide">
                  Have a project, idea, or opportunity in mind? Let's connect.
                </p>
              </div>
            </div>

            {/* Side-by-Side Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* LEFT CARD: PHONE */}
              <a
                href="tel:+918985407948"
                className="group relative p-8 md:p-10 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 hover:border-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 rounded-[2rem] flex flex-col justify-between min-h-[240px] md:min-h-[260px]"
              >
                {/* Top: Icon + Label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                    <FiPhone size={22} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.45em] text-blue-400 font-semibold">
                    PHONE
                  </span>
                </div>

                {/* Middle: Phone Details */}
                <div className="my-2">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] mb-2">
                    DIRECT CALL / MOBILE
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    +91 89854 07948
                  </h3>
                </div>

                {/* Bottom: Action */}
                <div className="mt-6 flex items-center text-[10px] font-mono uppercase tracking-[0.35em] text-gray-400 group-hover:text-white transition-colors">
                  <span>OPEN DIALER ↗</span>
                </div>
              </a>

              {/* RIGHT CARD: LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/kotana-pradeep"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 md:p-10 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 hover:border-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 rounded-[2rem] flex flex-col justify-between min-h-[240px] md:min-h-[260px]"
              >
                {/* Top: Icon + Label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                    <FiLinkedin size={22} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.45em] text-blue-400 font-semibold">
                    LINKEDIN
                  </span>
                </div>

                {/* Middle: LinkedIn Details */}
                <div className="my-2">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] mb-2">
                    PROFESSIONAL PROFILE
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors break-all">
                    linkedin.com/in/kotana-pradeep
                  </h3>
                </div>

                {/* Bottom: Action */}
                <div className="mt-6 flex items-center text-[10px] font-mono uppercase tracking-[0.35em] text-gray-400 group-hover:text-white transition-colors">
                  <span>VISIT PROFILE ↗</span>
                </div>
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
