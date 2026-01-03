import React from 'react';

export default function Navbar({ setView }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-white/5">
      <div className="container-custom h-20 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 font-bold text-2xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-accent-gold">Nile</span>
          <span className="text-white">Vault</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-text-muted">
          <button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How It Works</button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setView('login')} className="text-text-main hover:text-white font-medium transition-colors">
            Log In
          </button>
          <button onClick={() => setView('signup')} className="btn btn-primary text-sm px-6 py-2.5">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
