import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      articles: [
        'How to create an account',
        'Setting up your first task',
        'Understanding the interface',
        'Quick start guide',
      ],
    },
    {
      title: 'Tasks & Lists',
      icon: '✅',
      articles: [
        'Creating and organizing tasks',
        'Using tags and labels',
        'Setting priorities',
        'Task templates',
      ],
    },
    {
      title: 'Calendar & Scheduling',
      icon: '📅',
      articles: [
        'Calendar integration',
        'Setting reminders',
        'Recurring tasks',
        'Time blocking',
      ],
    },
    {
      title: 'Collaboration',
      icon: '👥',
      articles: [
        'Sharing lists with team',
        'Assigning tasks',
        'Comments and mentions',
        'Team permissions',
      ],
    },
    {
      title: 'Productivity Features',
      icon: '⚡',
      articles: [
        'Pomodoro timer',
        'Habit tracking',
        'Focus mode',
        'Statistics and reports',
      ],
    },
    {
      title: 'Account & Settings',
      icon: '⚙️',
      articles: [
        'Managing your profile',
        'Notification settings',
        'Privacy controls',
        'Subscription management',
      ],
    },
    {
      title: 'Mobile Apps',
      icon: '📱',
      articles: [
        'iOS app features',
        'Android app features',
        'Widgets and shortcuts',
        'Offline mode',
      ],
    },
    {
      title: 'Integrations',
      icon: '🔌',
      articles: [
        'Google Calendar sync',
        'Email integration',
        'Third-party apps',
        'API documentation',
      ],
    },
  ];

  const popularArticles = [
    {
      title: 'How do I create my first task?',
      views: '15.2K',
      helpful: '98%',
    },
    {
      title: 'Setting up calendar synchronization',
      views: '12.8K',
      helpful: '96%',
    },
    {
      title: 'Understanding task priorities',
      views: '10.5K',
      helpful: '94%',
    },
    {
      title: 'How to share lists with team members',
      views: '9.3K',
      helpful: '97%',
    },
    {
      title: 'Using the Pomodoro timer effectively',
      views: '8.7K',
      helpful: '95%',
    },
  ];

  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
        <div className="container mx-auto max-w-[900px] px-6 text-center">
          <h1 className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-[18px] text-[#666666] mb-8">
            Search our knowledge base or browse categories below
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-[700px] mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-6 py-5 pl-14 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[16px] shadow-lg"
            />
            <svg
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-[48px] mb-4">{category.icon}</div>
                <h3 className="text-[20px] font-semibold mb-4 text-[#1f2329] group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href="/guide"
                        className="text-[14px] text-[#666666] hover:text-blue-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center">
            Popular Articles
          </h2>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== popularArticles.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold text-[#1f2329] mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[14px] text-[#999999]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {article.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.helpful} helpful
                      </span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold mb-2">Live Chat</h3>
              <p className="text-[14px] text-[#666666] mb-4">
                Chat with our support team
              </p>
              <button className="text-blue-600 font-medium hover:underline">
                Start Chat
              </button>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold mb-2">Email Support</h3>
              <p className="text-[14px] text-[#666666] mb-4">
                Get help via email
              </p>
              <a href="mailto:support@example.com" className="text-green-600 font-medium hover:underline">
                Send Email
              </a>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold mb-2">Documentation</h3>
              <p className="text-[14px] text-[#666666] mb-4">
                Read detailed guides
              </p>
              <a href="/guide" className="text-purple-600 font-medium hover:underline">
                View Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-[800px] px-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
            <h2 className="text-[32px] md:text-[36px] font-bold mb-4">
              Still need help?
            </h2>
            <p className="text-[18px] text-[#666666] mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
