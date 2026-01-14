import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CinematicPlayer from './CinematicPlayer';

const ShowreelModal = ({ isOpen, onClose, videoUrl }) => {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999]"
                    />

                    {/* Modal Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="fixed inset-0 z-[10000] flex items-end justify-center pb-20 pointer-events-none"
                    >
                        <div className="w-full max-w-4xl relative pointer-events-auto px-4 md:px-0">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute -top-16 right-0 md:-right-16 z-20 p-3 bg-black/40 hover:bg-primary rounded-full transition-all text-white group shadow-2xl backdrop-blur-md border border-white/10"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            {/* Video Container (Player handles its own rounding/border) */}
                            <CinematicPlayer
                                videoUrl={videoUrl}
                                title="BARAA BASIM - SHOWREEL"
                            />

                            {/* Signal Label */}
                            <div className="absolute -bottom-8 left-0 opacity-40 pointer-events-none">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                                    <span className="text-white text-[8px] font-black uppercase tracking-[0.4em]">
                                        Secure Link Established
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ShowreelModal;
