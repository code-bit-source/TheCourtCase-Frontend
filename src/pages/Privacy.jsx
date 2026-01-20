import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
        <div className="container mx-auto max-w-[900px] px-6 text-center">
          <h1 className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[16px] text-[#666666]">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Introduction</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                Welcome to our Privacy Policy. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Information We Collect</h2>
              
              <h3 className="text-[24px] font-semibold mb-3 text-[#1f2329] mt-6">Personal Information</h3>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666] mb-4">
                <li>Register for an account</li>
                <li>Use our services</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                This information may include your name, email address, phone number, and other contact details.
              </p>

              <h3 className="text-[24px] font-semibold mb-3 text-[#1f2329] mt-6">Usage Data</h3>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We automatically collect certain information when you use our application, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li>Device information (type, operating system, unique device identifiers)</li>
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Usage patterns and preferences</li>
                <li>Location data (with your permission)</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">How We Use Your Information</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing your transactions and managing your account</li>
                <li>Sending you technical notices, updates, and support messages</li>
                <li>Responding to your comments, questions, and customer service requests</li>
                <li>Communicating with you about products, services, and events</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Detecting, preventing, and addressing technical issues and security threats</li>
                <li>Personalizing your experience and delivering relevant content</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Data Sharing and Disclosure</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> When you have given us explicit permission</li>
              </ul>
              <p className="text-[16px] leading-[1.8] text-[#666666] mt-4">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Data Security</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-[16px] leading-[1.8] text-[#666666] mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Your Rights and Choices</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              </ul>
              <p className="text-[16px] leading-[1.8] text-[#666666] mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@example.com" className="text-[#617fdf] hover:underline">
                  privacy@example.com
                </a>
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Cookies and Tracking Technologies</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Children's Privacy</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Changes to This Privacy Policy</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Contact Us</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 text-[16px] text-[#666666]">
                <li>
                  Email:{' '}
                  <a href="mailto:privacy@example.com" className="text-[#617fdf] hover:underline">
                    privacy@example.com
                  </a>
                </li>
                <li>
                  Support:{' '}
                  <a href="/contact" className="text-[#617fdf] hover:underline">
                    Contact Form
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
