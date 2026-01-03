import React from 'react';

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Community Guidelines</h1>
        <div className="bg-primary-light/20 p-8 rounded-xl border border-primary-light space-y-6 text-text-muted">
          <p className="text-sm text-text-muted">Last Updated: December 31, 2025</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p>NileVault is dedicated to creating a supportive academic community where students can share knowledge and resources. These guidelines help maintain a positive and productive environment for everyone.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Upload Quality Standards</h2>
            <p className="mb-3">When uploading resources:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ensure content is accurate and relevant to the course/topic</li>
              <li>Use clear, descriptive titles and categories</li>
              <li>Upload complete documents (avoid partial or corrupted files)</li>
              <li>Verify that files are readable and properly formatted</li>
              <li>Include relevant metadata (course code, semester, year)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Copyright and Academic Integrity</h2>
            <p className="mb-3">Respect intellectual property:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Only upload content you have the right to share</li>
              <li>Do not upload copyrighted textbooks or paid materials</li>
              <li>Credit original authors when applicable</li>
              <li>Personal notes and summaries are encouraged</li>
              <li>Past questions should be from official sources or properly attributed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Prohibited Content</h2>
            <p className="mb-3">The following are strictly prohibited:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Exam answers or solutions during active exam periods</li>
              <li>Plagiarized content</li>
              <li>Offensive, discriminatory, or harassing material</li>
              <li>Malware, viruses, or malicious code</li>
              <li>Spam or irrelevant content</li>
              <li>Personal information of others without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Respectful Interaction</h2>
            <p className="mb-3">Foster a positive community:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be respectful and courteous to all users</li>
              <li>Provide constructive feedback</li>
              <li>Acknowledge and appreciate contributions from others</li>
              <li>Report inappropriate content or behavior</li>
              <li>Help newcomers navigate the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Categorization Best Practices</h2>
            <p className="mb-3">Help others find resources easily:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the correct category for your uploads</li>
              <li>Include course codes in titles when applicable</li>
              <li>Add relevant tags and descriptions</li>
              <li>Specify the academic level (100, 200, 300, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Reporting Violations</h2>
            <p className="mb-3">If you encounter content that violates these guidelines:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the "Report" feature on the resource</li>
              <li>Provide specific details about the violation</li>
              <li>Contact us at report@nilevault.com for urgent issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Consequences of Violations</h2>
            <p className="mb-3">Violations may result in:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Content removal</li>
              <li>Warning notifications</li>
              <li>Temporary account suspension</li>
              <li>Permanent account termination for serious or repeated violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contributing to the Community</h2>
            <p className="mb-3">We encourage you to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Share high-quality notes and resources</li>
              <li>Help verify the accuracy of uploaded content</li>
              <li>Suggest improvements to the platform</li>
              <li>Participate in community discussions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p>Questions about these guidelines? Contact us at:</p>
            <p className="mt-2">Email: community@nilevault.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
