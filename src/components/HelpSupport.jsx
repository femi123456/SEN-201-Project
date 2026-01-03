import React from 'react';

export default function HelpSupport() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-dropdown">
      <div className="bg-bg-card rounded-2xl border border-primary-light p-8 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">
          🤝
        </div>
        <h2 className="text-3xl font-bold text-text-main">How can we help?</h2>
        <p className="text-text-muted max-w-lg mx-auto">
          Need assistance with NileVault? Check our common topics below or reach out to our team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <HelpCard
            icon="📖"
            title="User Guide"
            description="Learn how to upload, search, and manage your resources."
          />
          <HelpCard
            icon="🔒"
            title="Privacy & Safety"
            description="Understand how we protect your academic data."
          />
          <HelpCard
            icon="📧"
            title="Contact Us"
            description="Email us at support@nilevault.com for direct help."
          />
        </div>

        <div className="mt-12 p-8 bg-primary/30 rounded-2xl border border-primary-light text-left">
          <h3 className="text-xl font-bold text-text-main mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <FAQItem
              question="What is the maximum file size for uploads?"
              answer="You can upload files up to 50MB. We support PDF, DOC, and high-quality images."
            />
            <FAQItem
              question="Are past questions verified?"
              answer="Resources are uploaded by students. Look for materials with high ratings for best results."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-primary/50 rounded-2xl border border-primary-light hover:border-accent-gold transition-colors group cursor-pointer">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-bold text-text-main mb-2">{title}</h3>
      <p className="text-xs text-text-muted">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="space-y-2">
      <h4 className="text-text-main font-medium">{question}</h4>
      <p className="text-sm text-text-muted">{answer}</p>
    </div>
  );
}
