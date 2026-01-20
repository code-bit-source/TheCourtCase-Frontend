import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  CheckCircle2, 
  Users, 
  Star,
  Plus,
  ArrowRight,
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Heart,
  DollarSign,
  FolderKanban
} from 'lucide-react';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Personal', icon: FileText },
    { name: 'Work', icon: Briefcase },
    { name: 'Education', icon: GraduationCap },
    { name: 'Health', icon: Heart },
    { name: 'Finance', icon: DollarSign },
    { name: 'Projects', icon: FolderKanban }
  ];

  const templates = [
    {
      title: 'Daily Task List',
      description: 'Organize your daily tasks and priorities',
      category: 'Personal',
      emoji: '📝',
      tasks: 12,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Project Management',
      description: 'Track project milestones and deliverables',
      category: 'Work',
      emoji: '📊',
      tasks: 25,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Study Schedule',
      description: 'Plan your study sessions and assignments',
      category: 'Education',
      emoji: '📚',
      tasks: 15,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Fitness Tracker',
      description: 'Monitor your workouts and health goals',
      category: 'Health',
      emoji: '💪',
      tasks: 10,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Budget Planner',
      description: 'Manage your expenses and savings',
      category: 'Finance',
      emoji: '💰',
      tasks: 8,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Weekly Meal Prep',
      description: 'Plan your meals for the week',
      category: 'Personal',
      emoji: '🍽️',
      tasks: 7,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Content Calendar',
      description: 'Schedule your content creation and publishing',
      category: 'Work',
      emoji: '📅',
      tasks: 20,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Home Renovation',
      description: 'Track your home improvement projects',
      category: 'Projects',
      emoji: '🏠',
      tasks: 18,
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: 'Reading List',
      description: 'Keep track of books you want to read',
      category: 'Personal',
      emoji: '📖',
      tasks: 30,
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Event Planning',
      description: 'Organize events from start to finish',
      category: 'Work',
      emoji: '🎉',
      tasks: 22,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Habit Tracker',
      description: 'Build and maintain positive habits',
      category: 'Personal',
      emoji: '✨',
      tasks: 14,
      color: 'from-violet-500 to-violet-600',
    },
    {
      title: 'Travel Itinerary',
      description: 'Plan your trips and adventures',
      category: 'Personal',
      emoji: '✈️',
      tasks: 16,
      color: 'from-sky-500 to-sky-600',
    },
  ];

  const popularTemplates = [
    {
      title: 'Getting Things Done (GTD)',
      description: 'Implement the popular GTD methodology with this comprehensive template',
      users: '50K+ users',
      rating: '4.9',
      emoji: '⚡',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Agile Sprint Planning',
      description: 'Manage your agile sprints with user stories, tasks, and retrospectives',
      users: '35K+ users',
      rating: '4.8',
      emoji: '🏃',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Wedding Planning',
      description: 'Plan your perfect wedding with this detailed checklist and timeline',
      users: '28K+ users',
      rating: '4.9',
      emoji: '💍',
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Job Search Tracker',
      description: 'Track applications, interviews, and follow-ups in your job search',
      users: '42K+ users',
      rating: '4.7',
      emoji: '💼',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

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
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Ready-to-Use Templates</span>
            </motion.div>

            <motion.h1
              className="text-[40px] md:text-[56px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#000000] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Task Templates
            </motion.h1>

            <motion.p
              className="max-w-[680px] text-[18px] md:text-[20px] leading-[1.6] text-[#606266] font-[400]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              Get started quickly with pre-built templates for common workflows and projects.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[1200px] px-6">
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;
              return (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
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

      {/* Templates Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={`${template.title}-${index}`}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {template.emoji}
                    </motion.div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[12px] font-semibold rounded-full">
                      {template.category}
                    </span>
                  </div>
                  
                  <h3 className="text-[20px] font-semibold mb-2 text-[#1f2329] group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </h3>
                  
                  <p className="text-[16px] text-[#666666] leading-[1.6] mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[14px] text-[#999999] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {template.tasks} tasks
                    </span>
                    <button className="text-blue-600 font-medium hover:underline flex items-center gap-2 group">
                      Use Template
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Custom Template CTA */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-10 h-10 text-blue-600" />
            </motion.div>
            <h2 className="text-[32px] md:text-[36px] font-bold mb-4">
              Create Your Own Template
            </h2>
            <p className="text-[18px] text-[#666666] mb-8 max-w-[600px] mx-auto">
              Have a unique workflow? Create a custom template and save it for future use or share it with your team.
            </p>
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Custom Template
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6">
          <motion.h2
            className="text-[36px] md:text-[40px] font-bold leading-[1.3] mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Most Popular Templates
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularTemplates.map((template, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-3xl flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {template.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold mb-2 text-[#1f2329] group-hover:text-blue-600 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-[16px] text-[#666666] leading-[1.6] mb-4">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-4 text-[14px] text-[#999999]">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {template.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {template.users}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates;
