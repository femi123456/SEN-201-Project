import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="bg-primary-light/20 p-8 rounded-xl border border-primary-light space-y-6 text-text-muted">
          <p className="text-sm text-text-muted">Last Updated: December 31, 2025</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using NileVault, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
            <p className="mb-3">When creating an account, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use a valid university email address</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Acceptable Use</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Upload copyrighted material without permission</li>
              <li>Share inappropriate, offensive, or harmful content</li>
              <li>Attempt to hack, disrupt, or damage the platform</li>
              <li>Use automated tools to scrape or download content</li>
              <li>Impersonate others or create fake accounts</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Content Ownership</h2>
            <p className="mb-3">Regarding uploaded content:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You retain ownership of content you upload</li>
              <li>You grant NileVault a license to host and display your content</li>
              <li>You represent that you have the right to upload the content</li>
              <li>We may remove content that violates these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p>The NileVault platform, including its design, features, and functionality, is owned by NileVault and protected by copyright and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
            <p>NileVault is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p>NileVault shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of NileVault after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
            <p>For questions about these Terms of Service, contact us at:</p>
            <p className="mt-2">Email: legal@nilevault.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
