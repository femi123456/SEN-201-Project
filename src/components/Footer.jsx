import React from 'react';

export default function Footer({ setView }) {
  const handleLinkClick = (view) => {
    if (setView) {
      setView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white/[0.02] border-t border-white/5 backdrop-blur-sm">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-4">
              <span className="text-accent-gold">Nile</span>
              <span className="text-text-main">Vault</span>
            </div>
            <p className="text-text-muted/60 text-sm leading-relaxed font-light">
              Your trusted academic resource platform for university students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-text-muted/60 text-sm font-light">
              <li><button onClick={() => handleLinkClick('home')} className="hover:text-accent-gold transition-colors">Home</button></li>
              <li><button onClick={() => handleLinkClick('signup')} className="hover:text-accent-gold transition-colors">Sign Up</button></li>
              <li><button onClick={() => handleLinkClick('login')} className="hover:text-accent-gold transition-colors">Login</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-tight">Support</h3>
            <ul className="space-y-3 text-text-muted/60 text-sm font-light">
              <li><a href="#" className="hover:text-accent-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-accent-gold transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-tight">Legal</h3>
            <ul className="space-y-3 text-text-muted/60 text-sm font-light">
              <li><button onClick={() => handleLinkClick('privacy')} className="hover:text-accent-gold transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleLinkClick('terms')} className="hover:text-accent-gold transition-colors">Terms of Service</button></li>
              <li><button onClick={() => handleLinkClick('cookies')} className="hover:text-accent-gold transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => handleLinkClick('guidelines')} className="hover:text-accent-gold transition-colors">Guidelines</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted/60 text-sm font-light">
            © 2025 NileVault. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-text-muted/60 hover:text-accent-gold transition-colors">
                <span className="sr-only">{social}</span>
                <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
