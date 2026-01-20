import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Newspaper,
  Clock,
  User,
  ArrowRight,
  Mail,
  Zap,
  Target,
  Users,
  Heart,
  Home,
  TrendingUp,
  Bot
} from 'lucide-react';

const Blog = () => {
  const [email, setEmail] = useState('');

  const featuredPost = {
    title: 'The Future of Productivity: AI-Powered Task Management',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we manage tasks and boost productivity in 2025.',
    author: 'Sarah Johnson',
    date: 'January 15, 2025',
    readTime: '8 min read',
    category: 'Product Updates',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    gradient: 'from-blue-500 to-purple-600',
  };

  const blogPosts = [
    {
      title: '10 Productivity Hacks for Remote Workers',
      excerpt: 'Working from home? These proven strategies will help you stay focused and productive.',
      author: 'Michael Chen',
      date: 'January 12, 2025',
      readTime: '6 min read',
      category: 'Productivity',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    },
    {
      title: 'How to Build Better Habits in 2025',
      excerpt: 'Start the new year right with these science-backed habit formation techniques.',
      author: 'Emily Rodriguez',
      date: 'January 10, 2025',
      readTime: '7 min read',
      category: 'Habits',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
    },
    {
      title: 'The Pomodoro Technique: A Complete Guide',
      excerpt: 'Master the art of focused work with this time management method.',
      author: 'David Kim',
      date: 'January 8, 2025',
      readTime: '10 min read',
      category: 'Time Management',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    },
    {
      title: 'Team Collaboration: Best Practices for 2025',
      excerpt: 'Learn how successful teams collaborate effectively in the modern workplace.',
      author: 'Lisa Anderson',
      date: 'January 5, 2025',
      readTime: '9 min read',
      category: 'Collaboration',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    },
    {
      title: 'Mindfulness and Productivity: Finding Balance',
      excerpt: 'Discover how mindfulness practices can enhance your productivity and well-being.',
      author: 'James Wilson',
      date: 'January 3, 2025',
      readTime: '8 min read',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    },
    {
      title: 'Getting Started with GTD Methodology',
      excerpt: 'A beginner-friendly introduction to the Getting Things Done system.',
      author: 'Sarah Johnson',
      date: 'December 28, 2024',
      readTime: '12 min read',
      category: 'Productivity',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    },
  ];

  const categories = [
    { name: 'All Posts', icon: Newspaper },
    { name: 'Productivity', icon: Zap },
    { name: 'Product Updates', icon: TrendingUp },
    { name: 'Time Management', icon: Clock },
    { name: 'Habits', icon: Target },
    { name: 'Collaboration', icon: Users },
    { name: 'Wellness', icon: Heart },
  ];

  const popularTopics = [
    { name: 'Productivity', count: 45, icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { name: 'Time Management', count: 32, icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { name: 'Habits', count: 28, icon: Target, color: 'from-green-500 to-emerald-500' },
    { name: 'Collaboration', count: 24, icon: Users, color: 'from-purple-500 to-indigo-500' },
    { name: 'Wellness', count: 20, icon: Heart, color: 'from-pink-500 to-rose-500' },
    { name: 'Remote Work', count: 18, icon: Home, color: 'from-teal-500 to-cyan-500' },
    { name: 'Goal Setting', count: 15, icon: Target, color: 'from-orange-500 to-red-500' },
    { name: 'Automation', count: 12, icon: Bot, color: 'from-indigo-500 to-purple-500' },
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
              <span className="text-sm font-medium text-blue-600">Insights & Stories</span>
            </motion.div>

            <motion.h1
              className="text-[40px] md:text-[56px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#000000] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Blog
            </motion.h1>

            <motion.p
              className="max-w-[680px] text-[18px] md:text-[20px] leading-[1.6] text-[#606266] font-[400]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              Tips, insights, and stories about productivity, time management, and getting things done.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                <motion.img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[12px] font-semibold rounded-full mb-4 w-fit">
                  {featuredPost.category}
                </span>
                <h2 className="text-[32px] md:text-[36px] font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-[18px] text-[#666666] leading-[1.6] mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[14px] text-[#999999]">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[12px] font-semibold rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-[20px] font-semibold mb-3 text-[#1f2329] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[16px] text-[#666666] leading-[1.6] mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[14px] text-[#999999] pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Posts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="container mx-auto max-w-[800px] px-6">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Mail className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h2 className="text-[32px] md:text-[36px] font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-[18px] text-[#666666] mb-8">
              Get the latest productivity tips and updates delivered to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-[14px] text-[#999999] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.h2
            className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Popular Topics
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mx-auto mb-3`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-[18px] font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-[14px] text-[#999999]">{topic.count} articles</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
