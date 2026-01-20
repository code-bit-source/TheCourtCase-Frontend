import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
        <div className="container mx-auto max-w-[900px] px-6 text-center">
          <h1 className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            Terms of Service
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
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Agreement to Terms</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and us, concerning your access to and use of our services.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                By accessing or using our services, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the services and you must discontinue use immediately.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Intellectual Property Rights</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                Unless otherwise indicated, the services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the services (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                The Content and the Marks are provided on the services "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">User Representations</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                By using the services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li>All registration information you submit will be true, accurate, current, and complete</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                <li>You are not a minor in the jurisdiction in which you reside</li>
                <li>You will not access the services through automated or non-human means</li>
                <li>You will not use the services for any illegal or unauthorized purpose</li>
                <li>Your use of the services will not violate any applicable law or regulation</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">User Registration</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                You may be required to register with the services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Prohibited Activities</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                You may not access or use the services for any purpose other than that for which we make the services available. The services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                As a user of the services, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666]">
                <li>Systematically retrieve data or other content from the services to create or compile a collection</li>
                <li>Make any unauthorized use of the services</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features</li>
                <li>Engage in unauthorized framing of or linking to the services</li>
                <li>Trick, defraud, or mislead us and other users</li>
                <li>Make improper use of our support services or submit false reports</li>
                <li>Engage in any automated use of the system</li>
                <li>Interfere with, disrupt, or create an undue burden on the services</li>
                <li>Attempt to impersonate another user or person</li>
                <li>Use any information obtained from the services to harass, abuse, or harm another person</li>
                <li>Use the services as part of any effort to compete with us</li>
                <li>Decipher, decompile, disassemble, or reverse engineer any of the software</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents</li>
                <li>Delete the copyright or other proprietary rights notice</li>
                <li>Upload or transmit viruses, Trojan horses, or other material</li>
                <li>Use the services in a manner inconsistent with any applicable laws or regulations</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">User Generated Contributions</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                The services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality. Any content you transmit to the services will be treated as non-confidential and non-proprietary.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                By creating or making available any User Contributions, you represent and warrant that you own or control all rights to your User Contributions and have the right to grant the license granted above to us and our affiliates and service providers.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Subscription and Payment</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                We accept the following forms of payment:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] text-[#666666] mb-4">
                <li>Credit Card</li>
                <li>Debit Card</li>
                <li>PayPal</li>
              </ul>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the services.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                We reserve the right to change prices at any time. All payments shall be in U.S. dollars unless otherwise specified.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Cancellation and Refunds</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                You can cancel your subscription at any time by logging into your account or contacting us. Your cancellation will take effect at the end of the current paid term.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                All purchases are non-refundable. If you are dissatisfied with our services, please contact us at{' '}
                <a href="mailto:support@example.com" className="text-[#617fdf] hover:underline">
                  support@example.com
                </a>
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Disclaimer</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Limitations of Liability</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Indemnification</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the services, breach of these Terms of Service, or violation of the rights of a third party.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Governing Law</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                These Terms shall be governed by and defined following the laws of the United States. You irrevocably consent that the courts shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Changes to Terms</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666]">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-[32px] font-bold mb-4 text-[#1f2329]">Contact Us</h2>
              <p className="text-[16px] leading-[1.8] text-[#666666] mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2 text-[16px] text-[#666666]">
                <li>
                  Email:{' '}
                  <a href="mailto:legal@example.com" className="text-[#617fdf] hover:underline">
                    legal@example.com
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

export default Terms;
