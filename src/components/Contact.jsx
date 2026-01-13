import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Youtube, Twitter, Send } from 'lucide-react';

const Contact = () => {
    const { login, user } = useAuth();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    // Auto-fill form effect
    React.useEffect(() => {
        if (user) {
            setFormState(prev => ({
                ...prev,
                name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch("https://formsubmit.co/ajax/outofrai@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <footer className="relative pt-32 pb-16 px-6 border-t border-white/5" id="contact">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Contact Info & Socials */}
                <div className="space-y-12">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,59,48,0.5)]" />
                            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] text-glow-red">Establish Connection</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8 text-glow-strong halation">
                            Let's <br /> <span className="text-white/20">Sync.</span>
                        </h2>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm uppercase tracking-widest opacity-60">
                            Currently accepting high-end cinematic projects,
                            AI consultation and creative collaborations
                            worldwide from Iraq.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <a href="mailto:outofrai@gmail.com" className="group flex items-center gap-4 text-2xl font-black text-white uppercase tracking-tighter hover:text-primary transition-colors">
                            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl group-hover:bg-primary/20 transition-all">
                                <Mail size={24} className="text-primary" />
                            </div>
                            outofrai@gmail.com
                        </a>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { icon: Instagram, href: "https://www.instagram.com/raiiq/" },
                            { icon: Linkedin, href: "https://www.linkedin.com/in/baraa-b-hazim-684268343/#" },
                            { icon: Youtube, href: "https://www.youtube.com/@thisrai" },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                className="w-14 h-14 flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl text-gray-400 transition-all hover:text-white"
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Form Slab */}
                <div className="bg-white/[0.02] backdrop-blur-[50px] border border-white/5 p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />

                    {!user && (
                        <div className="flex justify-center mb-10 relative z-10">
                            <button
                                onClick={login}
                                className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl"
                            >
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                Authenticate to Send
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1">Identity</label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 text-white font-black uppercase tracking-tighter focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                                    placeholder="Enter Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1">Endpoint</label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 text-white font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                                    placeholder="Enter Email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1">Transmission Data</label>
                            <textarea
                                rows={4}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-white/[0.05] border border-white/5 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-white/10"
                                placeholder="Describe the mission scope..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`w-full font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-4 group disabled:opacity-50 uppercase tracking-[0.2em] text-[10px] shadow-2xl ${status === 'error' ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-primary hover:text-white'
                                }`}
                        >
                            {status === 'submitting' ? 'Transmitting...' :
                                status === 'success' ? 'Transmission Complete' :
                                    status === 'error' ? 'Link Failure' : (
                                        <>
                                            Execute Uplink <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    &copy; {new Date().getFullYear()} BARAA BASIM / CI-ALPHA OPS.
                </p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <span>Precision Interface V.2.0</span>
                    <span>All Rights Encrypted</span>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
