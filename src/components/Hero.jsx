import React from 'react';

export default function Hero({ setView }) {
  const handleAccessVault = () => {
    if (setView) {
      setView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-gold/30 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-text-muted">New: Semester 2 Past Questions Available</span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Your Academic
              <br />
              <span className="gradient-text">Digital Vault</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-text-muted/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Access verified lecture materials, past questions, and resources in one secure platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={handleAccessVault} className="btn btn-primary min-w-[200px] text-base shadow-xl shadow-accent-gold/20">
                Access Vault
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button onClick={handleAccessVault} className="btn btn-secondary min-w-[200px] text-base">
                View Courses
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5">
              {[
                { value: '500+', label: 'Lecture Notes' },
                { value: '1.2k', label: 'Past Questions' },
                { value: '15', label: 'Departments' },
                { value: '24/7', label: 'Access' }
              ].map((stat, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-text-muted font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Why Choose NileVault?</h2>
            <p className="text-xl text-text-muted/80 max-w-2xl mx-auto font-light">
              Everything you need to excel academically, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '📚',
                title: 'Comprehensive Library',
                description: 'Access thousands of verified lecture notes, textbooks, and study materials across all departments.'
              },
              {
                icon: '🔒',
                title: 'Secure & Reliable',
                description: 'Your data is protected with industry-standard encryption. Access your resources anytime, anywhere.'
              },
              {
                icon: '🚀',
                title: 'Smart Search',
                description: 'Find exactly what you need in seconds with our intelligent search and filtering system.'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-text-muted/80 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">How It Works</h2>
            <p className="text-xl text-text-muted/80 font-light">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { num: '1', title: 'Sign Up', desc: 'Create your free account with your university email' },
              { num: '2', title: 'Browse', desc: 'Search and filter resources by course, department, or category' },
              { num: '3', title: 'Access', desc: 'Download or view materials instantly, anytime you need them' }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-gold to-yellow-400 text-primary rounded-3xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-2xl shadow-accent-gold/30 group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-text-muted/80 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 via-transparent to-accent-gold/10"></div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-text-muted/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of students already using NileVault to ace their studies
          </p>
          <button onClick={handleAccessVault} className="btn btn-primary text-lg px-12 py-5 shadow-2xl shadow-accent-gold/30">
            Create Free Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
