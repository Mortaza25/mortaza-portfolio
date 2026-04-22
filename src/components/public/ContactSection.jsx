import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch('https://formsubmit.co/ajax/mortazaaazkaa2509@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: "New Portfolio Message!",
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            setStatus('error');
            console.error("Submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32 px-6 bg-white min-h-screen flex flex-col justify-center border-t border-gray-100">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4 md:mb-6 leading-tight">Let's build<br/>something <span className="text-gray-400">great.</span></h2>
                    <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-md">
                        I'm currently available for freelance work or full-time roles. If you have a project that needs some creative touch, I'd love to hear about it.
                    </p>
                    
                    <div className="space-y-4 md:space-y-6">
                        <a href="mailto:mortazaaazkaa2509@gmail.com" className="flex items-center w-fit text-dark hover:text-gray-500 transition-colors">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center mr-3 md:mr-4">
                                <Mail size={18} className="md:w-5 md:h-5" />
                            </div>
                            <span className="text-sm md:text-lg font-medium break-all">mortazaaazkaa2509@gmail.com</span>
                        </a>
                        <div className="flex gap-4 pt-2 md:pt-4">
                            <a href="https://github.com/Mortaza25" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all cursor-pointer">
                                <i className="fa-brands fa-github text-lg md:text-xl"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/azka-mortaza-9818163a5/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all cursor-pointer">
                                <i className="fa-brands fa-linkedin text-lg md:text-xl"></i>
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 p-5 sm:p-8 md:p-12 rounded-[2rem]"
                >
                    <h3 className="text-2xl font-bold text-dark mb-8">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Your Name</label>
                            <div className="relative group overflow-hidden rounded-xl">
                                <input 
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-dark focus:outline-none transition-all"
                                    placeholder="Jhon Doe"
                                />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-dark transition-all duration-500 group-focus-within:w-full z-10"></span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                            <div className="relative group overflow-hidden rounded-xl">
                                <input 
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-dark focus:outline-none transition-all"
                                    placeholder="jhon@example.com"
                                />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-dark transition-all duration-500 group-focus-within:w-full z-10"></span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Project Details</label>
                            <div className="relative group overflow-hidden rounded-xl">
                                <textarea 
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-dark focus:outline-none transition-all resize-none"
                                    placeholder="Tell me about your idea..."
                                />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-dark transition-all duration-500 group-focus-within:w-full z-10"></span>
                            </div>
                        </div>
                        {status === 'success' && <div className="text-green-600 font-medium text-sm">Message sent successfully! I will get back to you soon.</div>}
                        {status === 'error' && <div className="text-red-500 font-medium text-sm">Failed to send message. Please try again.</div>}
                        
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-dark text-white rounded-xl py-5 font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-70 shadow-lg cursor-pointer flex items-center justify-center cursor-pointer"
                            >
                                {loading ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
