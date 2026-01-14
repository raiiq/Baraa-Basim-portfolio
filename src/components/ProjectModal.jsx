import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Film, Calendar } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const ProjectModal = ({ project, isOpen, onClose, initialFullscreen }) => {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-active');
        } else {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('modal-active');
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('modal-active');
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-[99999]"
                    />

                    {/* Modal Content - Full screen on mobile */}
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 sm:p-4 pointer-events-none overflow-y-auto custom-scrollbar">
                        <div className="w-full h-full sm:h-auto flex items-start sm:items-center justify-center pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-[#050505] sm:bg-[#1a1a1a] w-full sm:max-w-5xl md:h-auto md:max-h-[90vh] sm:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                            >
                                {/* Close Button - Larger on mobile for touch */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-50 p-4 bg-primary text-white rounded-full sm:bg-black/50 sm:hover:bg-primary transition-all shadow-2xl active:scale-90"
                                >
                                    <X size={28} />
                                </button>

                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Media Section (Top on mobile, Left on desktop) */}
                                    <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center flex-shrink-0">
                                        {project.video ? (
                                            <VideoPlayer
                                                videoUrl={project.video}
                                                title={project.title}
                                                aspect_ratio={project.aspect_ratio || project.aspectRatio || '16/9'}
                                                initialFullscreen={initialFullscreen}
                                            />
                                        ) : (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>

                                    {/* Details Section (Bottom on mobile, Right on desktop) */}
                                    <div className="w-full md:w-1/3 p-5 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/10 flex flex-col bg-[#0a0a0a] sm:bg-[#121212] flex-grow overflow-y-auto">
                                        <span className="text-primary text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">{project.category}</span>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{project.title}</h2>
                                        <p className="text-gray-400 text-sm mb-4 sm:mb-6 flex items-center gap-2">
                                            <Film size={16} /> {project.role}
                                        </p>

                                        {project.release_date && (
                                            <p className="text-gray-400 text-sm mb-4 sm:mb-6 flex items-center gap-2">
                                                <Calendar size={16} /> {new Date(project.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        )}

                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto">
                                            <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                <Camera size={18} className="text-primary" /> Technical Gear
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.gear.map((item, index) => (
                                                    <span key={index} className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Mobile Dedicated Close Button */}
                                        <div className="mt-10 sm:hidden">
                                            <button
                                                onClick={onClose}
                                                className="w-full py-5 bg-white/[0.05] border border-white/10 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-[10px] active:bg-primary transition-colors"
                                            >
                                                Termination Sequence // Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
