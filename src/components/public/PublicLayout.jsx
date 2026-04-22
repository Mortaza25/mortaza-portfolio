import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import CertificatesSection from './CertificatesSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

const PublicLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Match the animation duration in LoadingScreen.jsx
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white relative cursor-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
                {loading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!loading && (
                <>
                    <Navbar />
                    <main>
                        <HeroSection />
                        <SkillsSection />
                        <ProjectsSection />
                        <CertificatesSection />
                        <ContactSection />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default PublicLayout;
