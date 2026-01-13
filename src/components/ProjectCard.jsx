import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Youtube, ExternalLink, Maximize } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
    const handleYoutubeClick = (e) => {
        e.stopPropagation();
        const youtubeUrl = project.video?.includes('youtube.com/embed/')
            ? project.video.replace('embed/', 'watch?v=')
            : project.video;
        window.open(youtubeUrl, '_blank');
    };

    const handleFullscreenClick = (e) => {
        e.stopPropagation();
        onClick(project, true);
    };

    return (
        <motion.div
            onClick={() => onClick(project)}
            className="group relative w-full aspect-video overflow-hidden rounded-[2.5rem] cursor-pointer bg-black/40 border border-white/5 shadow-2xl transition-all duration-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
        >
            {/* Background Image with sophisticated hover */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0 brightness-[0.4] group-hover:brightness-[0.6]"
                />
            </div>

            {/* Edge-lighting effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 halation-border rounded-[2rem] transition-all duration-1000 z-10 pointer-events-none" />

            {/* Quick Actions Menu - Top Right Corner */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {/* Fullscreen Trigger */}
                <button
                    onClick={handleFullscreenClick}
                    className="flex items-center gap-2 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-primary hover:border-primary/50 transition-all duration-300 group/btn pointer-events-auto shadow-2xl"
                    title="Enter Cinematic Mode"
                >
                    <Maximize size={16} />
                    <span className="max-w-0 overflow-hidden group-hover/btn:max-w-[100px] transition-all duration-500 whitespace-nowrap text-[8px] font-black uppercase tracking-widest">
                        Cinematic
                    </span>
                </button>

                {/* YouTube Link */}
                <button
                    onClick={handleYoutubeClick}
                    className="flex items-center gap-2 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-[#FF0000] hover:border-[#FF0000]/50 transition-all duration-300 group/btn pointer-events-auto shadow-2xl"
                    title="Watch on YouTube"
                >
                    <Youtube size={16} />
                    <span className="max-w-0 overflow-hidden group-hover/btn:max-w-[100px] transition-all duration-500 whitespace-nowrap text-[8px] font-black uppercase tracking-widest">
                        YouTube
                    </span>
                </button>
            </div>

            {/* HUD Overlay Slab */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />


                {/* Technical HUD Accents */}
                <div className="absolute top-10 left-10 w-8 h-[1px] bg-white/20 group-hover:bg-primary shadow-[0_0_15px_rgba(255,59,48,0.4)] transition-all duration-700 group-hover:w-16" />
                <div className="absolute top-10 left-10 w-[1px] h-8 bg-white/20 group-hover:bg-primary shadow-[0_0_15px_rgba(255,59,48,0.4)] transition-all duration-700 group-hover:h-16" />

                <div className="relative z-30 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                    <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,59,48,0.8)]" />
                        <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] text-glow-red halation">
                            MISSION_ARCHIVE //
                        </span>
                        <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">
                            00{project.id}
                        </span>
                    </div>

                    <h3
                        className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tighter mb-6 text-glow-strong halation"
                        style={{ fontFamily: project.font || 'IBM Plex Sans Arabic' }}
                    >
                        <span className="text-primary text-glow-red halation">{project.category}</span>
                        <span className="mx-4 text-white/5 font-thin">//</span>
                        {project.title}
                    </h3>

                    <div className="flex items-center gap-10 pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-150">
                        <div className="space-y-1">
                            <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Designation.</span>
                            <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em] transition-colors group-hover:text-primary/80">{project.role}</span>
                        </div>
                        <div className="space-y-1 border-l border-white/5 pl-10">
                            <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Asset_Type.</span>
                            <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em] transition-colors group-hover:text-primary/80">Cinematic Sequence</span>
                        </div>
                        {project.release_date && (
                            <div className="space-y-1 border-l border-white/5 pl-10">
                                <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Release.</span>
                                <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em] transition-colors group-hover:text-primary/80">
                                    {new Date(project.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
