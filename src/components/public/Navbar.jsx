import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                            offset={-72}
                            duration={500}
                            activeClass="active"
                            className="relative cursor-pointer text-dark font-semibold transition-all duration-300 group"
                        >
                            {link.name}
                            <span className="absolute left-0 bottom-[-6px] w-0 h-[2.5px] bg-dark transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-6 md:hidden z-40"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-72}
                                duration={500}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xl font-bold text-dark border-b border-gray-50 pb-4 cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
