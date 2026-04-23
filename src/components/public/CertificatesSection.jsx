import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certificatesData } from '../../data/portfolioData';

// Helper for seamless wrapping
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const CertCard = ({ cert }) => (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden group flex flex-col w-[280px] sm:w-[320px] md:w-[380px] shrink-0 mx-3 sm:mx-4 my-6 sm:my-8 pointer-events-auto">
        <div className="p-3 md:p-4 pb-0 md:pb-0">
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 rounded-[1.5rem] md:rounded-[1.8rem] group/img">
                {cert.drive_url ? (
                    <a href={cert.drive_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-default">
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                            <div className="flex items-center gap-2 bg-white text-dark px-4 py-2 rounded-full font-bold text-[10px] tracking-wider uppercase transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
                                <ExternalLink size={12} />
                                <span>View</span>
                            </div>
                        </div>
                    </a>
                ) : (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                )}
            </div>
        </div>

        <div className="p-6 md:p-7 flex flex-col flex-1">
            <h3 className="font-bold text-dark text-base md:text-lg mb-3 leading-snug tracking-tight uppercase line-clamp-2">{cert.title}</h3>
            <div className="mt-auto pt-4 border-t border-gray-50 flex">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    {cert.issuer}
                </span>
            </div>
        </div>
    </div>
);

const CertificatesSection = () => {
    const baseX = useMotionValue(0);
    const containerRef = useRef(null);
    const lastTouchX = useRef(0);
    const isInteracting = useRef(false);
    const resumeTimeout = useRef(null);

    // Auto-scroll speed
    const speed = -0.8; 

    useAnimationFrame((t, delta) => {
        if (!isInteracting.current) {
            let moveBy = speed * (delta / 16);
            baseX.set(baseX.get() + moveBy);
        }
    });

    // Content width calculation
    const cardWidth = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 304 : (window.innerWidth < 768 ? 352 : 412)) : 352;
    const totalContentWidth = certificatesData.length * cardWidth;
    
    // Smooth infinite wrapping
    const x = useTransform(baseX, (v) => `${wrap(-totalContentWidth, 0, v)}px`);

    const isDragging = useRef(false);
    const lastX = useRef(0);

    const handleInteractionstart = () => {
        isInteracting.current = true;
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };

    const handleInteractionEnd = () => {
        isDragging.current = false;
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
        resumeTimeout.current = setTimeout(() => {
            isInteracting.current = false;
        }, 800);
    };

    // Touchpad/Wheel Support
    const onWheel = (e) => {
        handleInteractionstart();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        baseX.set(baseX.get() - delta * 0.8);
        handleInteractionEnd();
    };

    // Mobile Swipe & Mouse Drag Support
    const onStart = (clientX) => {
        handleInteractionstart();
        isDragging.current = true;
        lastX.current = clientX;
    };

    const onMove = (clientX) => {
        if (!isDragging.current) return;
        const deltaX = clientX - lastX.current;
        baseX.set(baseX.get() + deltaX);
        lastX.current = clientX;
    };

    const onEnd = () => {
        handleInteractionEnd();
    };

    return (
        <section id="certificates" className="py-16 md:py-32 bg-[#fcfcfc] relative overflow-hidden border-b border-gray-100 cursor-default select-none">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

            <div className="max-w-6xl mx-auto w-full px-6 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-10 md:mb-24 text-center border-b border-gray-200 pb-10"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dark mb-4 sm:mb-6 tracking-tight">Certifications & Awards</h2>
                    <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">Continuous learning and professional recognitions.</p>
                </motion.div>
            </div>

            <div 
                className="relative w-full overflow-hidden py-4 cursor-default select-none active:cursor-default"
                onWheel={onWheel}
                onTouchStart={(e) => onStart(e.touches[0].clientX)}
                onTouchMove={(e) => onMove(e.touches[0].clientX)}
                onTouchEnd={onEnd}
                onMouseDown={(e) => onStart(e.clientX)}
                onMouseMove={(e) => onMove(e.clientX)}
                onMouseUp={onEnd}
                onMouseLeave={onEnd}
            >
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>

                <motion.div 
                    ref={containerRef}
                    className="flex w-max cursor-default active:cursor-default select-none"
                    style={{ x, willChange: 'transform' }}
                >
                    {/* Render enough copies for seamless infinity */}
                    {[...Array(4)].map((_, i) => (
                        <React.Fragment key={i}>
                            {certificatesData.map((cert) => (
                                <CertCard key={`${cert.id}-${i}`} cert={cert} />
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CertificatesSection;
