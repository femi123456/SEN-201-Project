import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
        <div className="bg-primary-light/20 p-8 rounded-xl border border-primary-light space-y-6 text-text-muted">
          <p className="text-sm text-text-muted">Last Updated: December 31, 2025</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and session management.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Performance Cookies</h3>
                <p>These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve our platform.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Functionality Cookies</h3>
                <p>These cookies allow our website to remember choices you make (such as your username or language preference) and provide enhanced features.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                <p>We use analytics cookies to understand how visitors interact with our website, helping us improve user experience and platform performance.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
            <p>We may use third-party services that set cookies on your device. These services help us with analytics, advertising, and other platform features.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Managing Cookies</h2>
            <p className="mb-3">You can control and manage cookies in several ways:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
              <li>Opt-out tools: Use browser extensions to block tracking cookies</li>
              <li>Privacy settings: Adjust your preferences in your account settings</li>
            </ul>
            <p className="mt-3">Note: Disabling certain cookies may affect the functionality of NileVault.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookie Duration</h2>
            <p className="mb-3">We use both session and persistent cookies:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Updates to This Policy</h2>
            <p>We may update this Cookie Policy to reflect changes in our practices or for legal reasons. Please review this page periodically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at:</p>
            <p className="mt-2">Email: privacy@nilevault.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
