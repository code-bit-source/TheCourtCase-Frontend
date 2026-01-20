import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Rocket, 
  CheckCircle2, 
  Building2, 
  Keyboard, 
  Search, 
  Users, 
  Clock, 
  Target, 
  Zap, 
  Calendar, 
  Mail, 
  Plug,
  Play,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const Guide = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      category: 'Getting Started',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600',
      items: [
        {
          title: 'Quick Start Guide',
          description: 'Learn the basics and get up and running in minutes',
          duration: '5 min read',
          icon: Rocket,
        },
        {
          title: 'Creating Your First Task',
          description: 'Step-by-step guide to creating and managing tasks',
          duration: '3 min read',
          icon: CheckCircle2,
        },
        {
          title: 'Setting Up Your Workspace',
          description: 'Organize your workspace for maximum productivity',
          duration: '7 min read',
          icon: Building2,
        },
      ],
    },
    {
      category: 'Advanced Features',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      items: [
        {
          title: 'Mastering Keyboard Shortcuts',
          description: 'Speed up your workflow with powerful shortcuts',
          duration: '10 min read',
          icon: Keyboard,
        },
        {
          title: 'Using Smart Filters',
          description: 'Create custom views with advanced filtering',
          duration: '8 min read',
          icon: Search,
        },
        {
          title: 'Collaboration Best Practices',
          description: 'Work effectively with your team',
          duration: '12 min read',
          icon: Users,
        },
      ],
    },
    {
      category: 'Productivity Tips',
      icon: Target,
      color: 'from-green-500 to-green-600',
      items: [
        {
          title: 'Time Management Techniques',
          description: 'Proven methods to boost your productivity',
          duration: '15 min read',
          icon: Clock,
        },
        {
          title: 'Building Better Habits',
          description: 'Use habit tracking to achieve your goals',
          duration: '10 min read',
          icon: Target,
        },
        {
          title: 'Pomodoro Technique Guide',
          description: 'Master focused work sessions',
          duration: '8 min read',
          icon: Zap,
        },
      ],
    },
    {
      category: 'Integration & Automation',
      icon: Plug,
      color: 'from-orange-500 to-orange-600',
      items: [
        {
          title: 'Calendar Integration',
          description: 'Sync with Google Calendar and other services',
          duration: '6 min read',
          icon: Calendar,
        },
        {
          title: 'Email to Task',
          description: 'Convert emails into actionable tasks',
          duration: '5 min read',
          icon: Mail,
        },
        {
          title: 'API & Webhooks',
          description: 'Automate workflows with our API',
          duration: '20 min read',
          icon: Plug,
        },
      ],
    },
  ];

  const videoTutorials = [
    {
      title: 'Getting Started in 5 Minutes',
      duration: '5:32',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    },
    {
      title: 'Advanced Task Management',
      duration: '12:45',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    },
    {
      title: 'Team Collaboration Features',
      duration: '8:20',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    },
    {
      title: 'Productivity Tips & Tricks',
      duration: '15:10',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
    },
  ];

  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-[100px] pb-[80px] lg:pt-[120px] lg:pb-[100px]">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] blur-[120px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(82, 123, 255, 0.4) 0%, transparent 70%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[-10%] w-[50%] h-[60%] blur-[120px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(56, 191, 107, 0.3) 0%, transparent 70%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Learn & Master</span>
            </motion.div>

            <motion.h1
              className="text-[40px] md:text-[56px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#000000] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Productivity Guides
            </motion.h1>

            <motion.p
              className="max-w-[680px] text-[18px] md:text-[20px] leading-[1.6] text-[#606266] mb-10 font-[400]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              Learn how to get the most out of our platform with comprehensive guides, tutorials, and best practices.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="w-full max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[16px] shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6">
          {guides.map((section, sectionIndex) => {
            const CategoryIcon = section.icon;
            return (
              <motion.div
                key={sectionIndex}
                className="mb-20 last:mb-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1f2329]">
                    {section.category}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((guide, guideIndex) => {
                    const GuideIcon = guide.icon;
                    return (
                      <motion.div
                        key={guideIndex}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: guideIndex * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                          <GuideIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-[20px] font-semibold mb-3 text-[#1f2329] group-hover:text-blue-600 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-[16px] text-[#666666] leading-[1.6] mb-4">
                          {guide.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] text-[#999999]">{guide.duration}</span>
                          <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="container mx-auto max-w-[1200px] px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-4">
              Video Tutorials
            </h2>
            <p className="text-[18px] text-[#666666] max-w-[700px] mx-auto">
              Watch step-by-step video guides to master every feature
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTutorials.map((video, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <motion.div
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-[14px] font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold text-[#1f2329] group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 bg-white">
        <motion.div
          className="absolute top-0 left-[-10%] w-[50%] h-[80%] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(82, 123, 255, 0.15) 0%, transparent 70%)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
        />

        <div className="container relative z-10 mx-auto max-w-[1100px] px-6">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[32px] md:text-[36px] font-bold mb-4">
              Need More Help?
            </h2>
            <p className="text-[18px] text-[#666666] mb-8 max-w-[600px] mx-auto">
              Can't find what you're looking for? Visit our Help Center or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/help-center"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold"
                >
                  Visit Help Center
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors font-semibold"
                >
                  Contact Support
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guide;
