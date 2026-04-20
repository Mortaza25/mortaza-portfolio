import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';

const curtainVariants = {
    hidden: { top: 0, height: "100%" },
    visible: { 
        top: "100%", 
        height: "0%", 
        transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 } 
    }
};

const imageVariants = {
    hidden: { scale: 1.2 },
    visible: { 
        scale: 1, 
        transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
    }
};

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-16 md:py-32 px-6 bg-[#fcfcfc] min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
            
            <div className="max-w-6xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-10"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 tracking-tighter">Selected Works.</h2>
                        <p className="text-gray-500 text-xl leading-relaxed font-light">A collection of my latest projects, experiments, and case studies.</p>
                    </div>
                    <div className="mt-8 md:mt-0 text-gray-400 uppercase tracking-widest text-sm font-semibold">
                        ( {projectsData.length} Projects )
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                    <AnimatePresence>
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className={`group flex flex-col bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                            >
                                <div className="p-4 md:p-5">
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="relative overflow-hidden aspect-[4/3] w-full cursor-pointer block group/img rounded-[1.8rem] md:rounded-[2rem]"
                                    >
                                        <motion.div 
                                            className="absolute inset-0 bg-dark z-20 pointer-events-none rounded-[1.8rem] md:rounded-[2rem]"
                                            variants={curtainVariants}
                                        />
                                        
                                        <motion.img 
                                            variants={imageVariants}
                                            src={project.thumbnail} 
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-in-out" 
                                        />
                                        
                                        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm rounded-[1.8rem] md:rounded-[2rem]">
                                            <div className="w-24 h-24 rounded-full bg-white text-dark flex items-center justify-center font-bold tracking-wider text-sm transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
                                                VIEW
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                
                                <div className="flex flex-col flex-1 p-8 md:p-12 pt-4 md:pt-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                        <h3 className="text-3xl font-bold text-dark uppercase tracking-tight">{project.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xl md:pl-4 justify-start md:justify-end">
                                            {(project.tech_stack || '').split(',').map((item, idx) => {
                                                const str = item.trim();
                                                if (!str) return null;
                                                if (str.startsWith('fa-')) {
                                                    return <i key={idx} className={`${str} hover:text-dark transition-colors`}></i>;
                                                }
                                                return <span key={idx} className="text-xs font-semibold text-gray-400 tracking-widest uppercase bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{str}</span>;
                                            })}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 mb-10 flex-1 text-lg leading-relaxed font-light">{project.description}</p>
                                    
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:bg-white hover:text-dark hover:ring-1 hover:ring-dark hover:scale-105 w-fit group/btn shadow-lg shadow-dark/5"
                                    >
                                        Explore Work 
                                        <ExternalLink size={16} className="transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
