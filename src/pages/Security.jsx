import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Security = () => {
  const securityFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'End-to-End Encryption',
      description: 'All your data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account with 2FA using authenticator apps or SMS.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Secure Cloud Storage',
      description: 'Your data is stored on secure, redundant servers with automatic backups and disaster recovery.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Regular Security Audits',
      description: 'We conduct regular security audits and penetration testing to identify and fix vulnerabilities.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: 'Access Controls',
      description: 'Granular permission controls ensure only authorized users can access sensitive data.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Threat Detection',
      description: 'Advanced monitoring systems detect and respond to potential security threats in real-time.',
    },
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Certified for security, availability, and confidentiality',
    },
    {
      name: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations',
    },
    {
      name: 'ISO 27001',
      description: 'International standard for information security management',
    },
    {
      name: 'CCPA Compliant',
      description: 'California Consumer Privacy Act compliance',
    },
  ];

  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
        <div className="container mx-auto max-w-[1100px] px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            Security & Trust
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#666666] max-w-[700px] mx-auto">
            Your security and privacy are our top priorities. We implement industry-leading security measures to protect your data.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center">
            How We Keep Your Data Safe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-[20px] font-semibold mb-3 text-[#1f2329]">
                  {feature.title}
                </h3>
                <p className="text-[16px] text-[#666666] leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-4 text-center">
            Certifications & Compliance
          </h2>
          <p className="text-[18px] text-[#666666] text-center mb-12 max-w-[700px] mx-auto">
            We maintain the highest standards of security and compliance with international regulations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold mb-2 text-[#1f2329]">
                  {cert.name}
                </h3>
                <p className="text-[14px] text-[#666666]">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-6">
                Our Security Practices
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold mb-2">Regular Updates</h3>
                    <p className="text-[16px] text-[#666666]">
                      We continuously update our systems and apply security patches to protect against emerging threats.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold mb-2">Employee Training</h3>
                    <p className="text-[16px] text-[#666666]">
                      All team members undergo regular security training and follow strict security protocols.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold mb-2">Incident Response</h3>
                    <p className="text-[16px] text-[#666666]">
                      We have a dedicated security team and incident response plan to quickly address any security issues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold mb-2">Data Privacy</h3>
                    <p className="text-[16px] text-[#666666]">
                      We never sell your data and only use it to provide and improve our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-[24px] font-bold mb-4">Report a Security Issue</h3>
                <p className="text-[16px] text-[#666666] mb-6">
                  If you discover a security vulnerability, please let us know immediately.
                </p>
                <a
                  href="mailto:security@example.com"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Contact Security Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[900px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center">
            Security FAQs
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-[20px] font-semibold mb-3">How is my data encrypted?</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">
                We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. This is the same level of encryption used by banks and government agencies.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-[20px] font-semibold mb-3">Where is my data stored?</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">
                Your data is stored in secure, SOC 2 certified data centers with redundant backups across multiple geographic locations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-[20px] font-semibold mb-3">Can you access my data?</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">
                We have strict access controls in place. Only authorized personnel can access user data, and only when necessary for support or maintenance purposes. All access is logged and monitored.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-[20px] font-semibold mb-3">What happens if there's a data breach?</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">
                We have a comprehensive incident response plan. In the unlikely event of a breach, we will notify affected users within 72 hours and take immediate action to secure the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
