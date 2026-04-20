import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import CertificatesSection from './CertificatesSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white relative cursor-none">
            <CustomCursor />
            <Navbar />
            <main>
                <HeroSection />
                <SkillsSection />
                <ProjectsSection />
                <CertificatesSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
