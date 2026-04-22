import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Wrench } from 'lucide-react';
import { skillsData } from '../../data/portfolioData';

const CATEGORIES = [
    { key: 'frontend', label: 'Frontend', icon: Monitor },
    { key: 'backend',  label: 'Backend',  icon: Server  },
    { key: 'tools',    label: 'Tools',    icon: Wrench  },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SkillsSection = () => {
    return (
        <section id="skills" className="py-16 md:py-24 lg:py-32 px-6 bg-[#fcfcfc] relative overflow-hidden border-b border-gray-100">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-10"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4 sm:mb-6 tracking-tighter">Core Competencies.</h2>
                        <p className="text-gray-500 text-[14px] md:text-xl leading-relaxed font-light">Technologies and tools I use to bring ideas to life.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CATEGORIES.map((cat, catIdx) => {
                        const catSkills = skillsData.filter(s => (s.category || 'frontend') === cat.key);
                        return (
                            <motion.div
                                key={cat.key}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: catIdx * 0.12 }}
                                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-3">
                                    <cat.icon size={18} className="text-dark shrink-0" />
                                    <h3 className="text-[15px] md:text-lg font-bold text-dark tracking-tight uppercase">{cat.label}</h3>
                                    <span className="ml-auto text-[10px] md:text-xs text-gray-400 font-semibold tracking-widest">({catSkills.length})</span>
                                </div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="p-5 flex flex-col gap-3"
                                >
                                    {catSkills.map(skill => (
                                        <motion.div
                                            key={skill.id}
                                            variants={itemVariants}
                                            className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all duration-300 cursor-default group"
                                        >
                                            {skill.icon
                                                ? <i className={`${skill.icon} text-lg md:text-2xl shrink-0`} style={{ color: skill.color || '#374151' }}></i>
                                                : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-[10px] md:text-sm shrink-0">{skill.name[0]}</div>
                                            }
                                            <span className="text-dark font-semibold text-[13px] md:text-base tracking-tight transition-transform duration-300">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
