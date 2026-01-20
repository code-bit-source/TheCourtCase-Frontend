import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Enterprise = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Advanced Security',
      description: 'Enterprise-grade security with SSO, SAML, and advanced access controls.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Unlimited Users',
      description: 'Scale your team without limits. Add as many users as you need.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Priority Support',
      description: 'Dedicated account manager and 24/7 priority support.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Custom Integration',
      description: 'API access and custom integrations with your existing tools.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics',
      description: 'Detailed insights and reporting for team productivity.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Dedicated Infrastructure',
      description: 'Private cloud deployment options for maximum control.',
    },
  ];

  const testimonials = [
    {
      quote: "This platform has transformed how our team collaborates. The enterprise features are exactly what we needed.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
      company: "TechCorp Inc.",
    },
    {
      quote: "The security features and compliance certifications gave us confidence to roll this out company-wide.",
      author: "Michael Chen",
      role: "IT Director, GlobalBank",
      company: "GlobalBank",
    },
    {
      quote: "Outstanding support and seamless integration with our existing tools. Highly recommended for enterprises.",
      author: "Emily Rodriguez",
      role: "VP Operations, StartupHub",
      company: "StartupHub",
    },
  ];

  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-[14px] font-semibold mb-6">
              ENTERPRISE SOLUTION
            </div>
            <h1 className="text-[48px] md:text-[64px] font-bold leading-[1.1] mb-6 tracking-tight">
              Built for Enterprise Teams
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#666666] max-w-[700px] mx-auto mb-8">
              Powerful productivity tools with enterprise-grade security, compliance, and support for organizations of any size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-[16px]"
              >
                Request Demo
              </a>
              <a
                href="/download"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-[16px]"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-4 text-center">
            Enterprise Features
          </h2>
          <p className="text-[18px] text-[#666666] text-center mb-12 max-w-[700px] mx-auto">
            Everything you need to manage productivity at scale
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
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

      {/* Stats Section */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10M+', label: 'Active Users' },
              { number: '50K+', label: 'Enterprise Customers' },
              { number: '99.9%', label: 'Uptime SLA' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[48px] md:text-[56px] font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-[16px] text-[#666666]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-6">
                Security & Compliance
              </h2>
              <p className="text-[18px] text-[#666666] leading-[1.6] mb-8">
                We take security seriously. Our platform is built with enterprise-grade security features and complies with major industry standards.
              </p>
              
              <div className="space-y-4">
                {[
                  'SOC 2 Type II Certified',
                  'GDPR & CCPA Compliant',
                  'ISO 27001 Certified',
                  'HIPAA Compliant Options',
                  'SSO & SAML Support',
                  'End-to-End Encryption',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[16px] text-[#1f2329]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[24px] font-bold mb-4">Enterprise Security</h3>
              <p className="text-[16px] text-[#666666]">
                Your data is protected with bank-level security and encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[1200px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center">
            Trusted by Leading Organizations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-[16px] text-[#666666] leading-[1.6] mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-[16px] text-[#1f2329]">
                    {testimonial.author}
                  </div>
                  <div className="text-[14px] text-[#999999]">
                    {testimonial.role}
                  </div>
                  <div className="text-[14px] text-[#999999]">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-[32px] md:text-[40px] font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[18px] mb-8 opacity-90">
              Join thousands of organizations using our platform to boost productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Schedule a Demo
              </a>
              <a
                href="/download"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
