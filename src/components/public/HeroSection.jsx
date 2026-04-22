import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { heroData } from '../../data/portfolioData';

const HeroSection = () => {
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

    const userImage = heroData.image_url || null;

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-16 sm:pt-24 md:pt-48 pb-12 relative overflow-hidden">
            <motion.div 
                style={{ y: yParallax, opacity: opacityParallax }}
                className="max-w-4xl mx-auto text-center relative z-10 md:-mt-24"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-6 md:mb-8"
                >
                    {userImage ? (
                        <div className="relative group">
                            {/* Improved mobile-only presence without glow */}
                            <div className="absolute -inset-0.5 bg-gray-200 rounded-full md:hidden"></div>
                            <img 
                                src={userImage} 
                                alt="Profile" 
                                className="relative w-36 h-36 xs:w-44 xs:h-44 md:w-52 md:h-52 rounded-full object-cover shadow-xl md:shadow-2xl border-4 border-white cursor-default grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    ) : (
                        <div className="w-36 h-36 md:w-52 md:h-52 rounded-full bg-gray-100 shadow-xl border-4 border-white"></div>
                    )}
                </motion.div>
                
                <div className="px-2 md:px-0">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                        className="text-[11px] md:text-sm font-bold text-gray-400 uppercase tracking-[0.4em] md:tracking-[0.3em] mb-2 md:mb-3"
                    >
                        {heroData.greeting}
                    </motion.p>

                    <div className="mb-4 md:mb-6 min-h-[60px] xs:min-h-[70px] md:min-h-[80px]">
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark tracking-tighter leading-tight md:leading-[1.2] lg:leading-tight">
                            {heroData.headline.split(' ').slice(0, -1).join(' ')}{' '}
                            <TypeAnimation
                                sequence={[
                                    heroData.headline.split(' ').pop(),
                                    2000,
                                    '',
                                    500
                                ]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                                className="text-dark font-bold inline-block"
                            />
                        </h1>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="text-[14px] md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-light"
                    >
                        {heroData.description}
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center"
                    >
                        <Link to="skills" smooth={true} duration={500} offset={-72}>
                            <button className="bg-dark text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                {heroData.button_text}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
