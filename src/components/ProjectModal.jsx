import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Film, Calendar } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const ProjectModal = ({ project, isOpen, onClose, initialFullscreen }) => {
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-[#1a1a1a] w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-primary transition-colors text-white"
                                >
                                    <X size={24} />
                                </button>

                                <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                                    {/* Media Section (Left/Top) */}
                                    <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center">
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

                                    {/* Details Section (Right/Bottom) */}
                                    <div className="w-full md:w-1/3 p-8 border-l border-white/10 flex flex-col bg-[#121212]">
                                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2">{project.category}</span>
                                        <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                                        <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                                            <Film size={16} /> {project.role}
                                        </p>

                                        {project.release_date && (
                                            <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                                                <Calendar size={16} /> {new Date(project.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        )}

                                        <p className="text-gray-300 leading-relaxed mb-8 flex-grow">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto">
                                            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                                <Camera size={18} className="text-primary" /> Technical Gear
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.gear.map((item, index) => (
                                                    <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
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
