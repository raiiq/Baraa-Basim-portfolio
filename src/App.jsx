import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import LiquidBackground from './components/LiquidBackground';
import GlobalWormhole from './components/GlobalWormhole';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Routes, Route } from 'react-router-dom';

const Home = () => (
  <>
    <Hero />
    <Gallery />
    <Resume />
    <Contact />
  </>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen text-white flex flex-col font-sans">
          <div className="fixed inset-0 z-10 overflow-hidden bg-black pointer-events-none">
            <GlobalWormhole />
            <LiquidBackground />
          </div>
          <div className="relative z-20 flex flex-col min-h-screen">
            <Navbar />
            
            {/* Cloudflare Badge */}
            <div className="fixed top-24 left-4 sm:left-8 z-30 pointer-events-auto flex items-center gap-2 bg-white/[0.03] backdrop-blur-[80px] border border-white/10 px-3 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] opacity-70 hover:opacity-100 hover:bg-white/[0.08] transition-all group">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#F38020] group-hover:drop-shadow-[0_0_8px_rgba(243,128,32,0.8)] transition-all">
                <path d="M16.94 9.176c-.443-4.14-3.66-7.14-7.44-7.14-3.13 0-5.83 2.11-6.9 4.96C1.19 7.37.1 8.65.1 10.3c0 2.1 1.7 3.82 3.8 3.82h15.22c2.69 0 4.88-2.19 4.88-4.88 0-2.48-1.85-4.52-4.2-4.84l-.86-.02z"/>
              </svg>
              <span className="text-[8px] sm:text-[9px] font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-300">Protected by Cloudflare</span>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
