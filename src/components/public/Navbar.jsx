import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'hero' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Certificates', to: 'certificates' },
        { name: 'Contact', to: 'contact' },
    ];

    const handleSetActive = (to) => {
        setActiveLink(to);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-white/90 backdrop-blur-md border-gray-100 shadow-sm py-4' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-dark relative z-50">
                    Mortaza.
                </div>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-10 text-base">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            onSetActive={handleSetActive}
                            className="relative cursor-pointer text-dark font-semibold transition-all duration-300 group"
                        >
                            {link.name}
                            <span className={`absolute left-0 bottom-[-6px] h-[2.5px] bg-dark transition-all duration-300 group-hover:w-full ${activeLink === link.to ? 'w-full' : 'w-0'}`}></span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-dark p-2 relative z-50 cursor-pointer"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl py-8 px-8 flex flex-col space-y-2 md:hidden z-40"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={500}
                                    onSetActive={handleSetActive}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-dark py-4 flex items-center justify-between cursor-pointer transition-colors"
                                >
                                    {link.name}
                                    <span className={`text-gray-300 text-sm font-light ${activeLink === link.to ? 'hidden' : ''}`}>→</span>
                                </Link>
                                <span className={`absolute left-0 bottom-2 h-[3px] bg-dark transition-all duration-300 group-hover:w-full ${activeLink === link.to ? 'w-full' : 'w-0'}`}></span>
                            </div>
                        ))}
                        <div className="pt-6 flex gap-6">
                            <a href="https://github.com/Mortaza25" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-gray-500">
                                <i className="fa-brands fa-github text-xl"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/azka-mortaza-9818163a5/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-gray-500">
                                <i className="fa-brands fa-linkedin text-xl"></i>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
