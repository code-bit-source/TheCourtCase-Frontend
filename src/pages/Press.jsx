import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Newspaper, 
  Download, 
  Mail, 
  Image as ImageIcon,
  Palette,
  FileText,
  Monitor,
  ExternalLink,
  Calendar,
  TrendingUp,
  Award,
  Handshake,
  DollarSign
} from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      date: 'January 15, 2025',
      title: 'Company Reaches 10 Million Users Milestone',
      excerpt: 'We are thrilled to announce that our platform has reached 10 million active users worldwide, marking a significant milestone in our journey.',
      category: 'Company News',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
    },
    {
      date: 'December 10, 2024',
      title: 'New AI-Powered Features Launch',
      excerpt: 'Introducing intelligent task suggestions and automated scheduling powered by advanced AI technology to boost productivity.',
      category: 'Product Update',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
    },
    {
      date: 'November 5, 2024',
      title: 'Partnership with Leading Enterprise Solutions',
      excerpt: 'Strategic partnership announced to bring enhanced collaboration tools to enterprise customers.',
      category: 'Partnership',
      icon: Handshake,
      color: 'from-green-500 to-green-600',
    },
    {
      date: 'October 20, 2024',
      title: 'Series B Funding Round Completed',
      excerpt: 'Successfully closed $50M Series B funding round to accelerate product development and global expansion.',
      category: 'Funding',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const mediaKit = [
    {
      title: 'Brand Guidelines',
      description: 'Logo usage, colors, and typography',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Company Logos',
      description: 'High-resolution logo files',
      icon: ImageIcon,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Product Screenshots',
      description: 'App interface and features',
      icon: Monitor,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Press Kit',
      description: 'Complete media resources',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
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
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Media & Press</span>
            </motion.div>

            <motion.h1
              className="text-[40px] md:text-[56px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#000000] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Press & Media
            </motion.h1>

            <motion.p
              className="max-w-[680px] text-[18px] md:text-[20px] leading-[1.6] text-[#606266] mb-4 font-[400]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              Latest news, press releases, and media resources.
            </motion.p>

            <motion.p
              className="text-[16px] text-[#606266]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              For press inquiries, contact us at{' '}
              <a href="mailto:press@example.com" className="text-[#527BFF] hover:underline font-medium">
                press@example.com
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.h2
            className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Press Releases
          </motion.h2>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => {
              const Icon = release.icon;
              return (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${release.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[12px] font-semibold rounded-full">
                          {release.category}
                        </span>
                        <span className="text-[14px] text-[#999999] flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </span>
                      </div>
                      <h3 className="text-[24px] font-semibold text-[#1f2329] mb-2 group-hover:text-blue-600 transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-[16px] text-[#666666] leading-[1.6] mb-4">
                        {release.excerpt}
                      </p>
                      <Link
                        to="/blog"
                        className="text-[#527BFF] font-medium hover:underline inline-flex items-center gap-2 group"
                      >
                        Read full release
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-4">
              Media Kit
            </h2>
            <p className="text-[18px] text-[#666666] max-w-[700px] mx-auto">
              Download our brand assets, logos, and product screenshots for your articles and publications.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-[18px] font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] mb-4">{item.description}</p>
                  <button className="text-[#527BFF] font-medium hover:underline inline-flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold mb-4">
              Media Inquiries
            </h2>
            <p className="text-[18px] text-[#666666] mb-8 max-w-[600px] mx-auto">
              For interviews, press releases, or media partnerships, please reach out to our press team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:press@example.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                Email Press Team
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/download"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Download Press Kit
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

export default Press;
