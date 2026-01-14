import React from 'react';
import { CheckCircle2, Calendar, Columns3, Clock, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FeatureCard = ({ icon: Icon, label, title, description, reverse = false, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className={`grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div 
        className={`${reverse ? 'md:order-2' : ''}`}
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 50 : -50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="inline-block text-blue-600 text-sm font-semibold mb-3 uppercase tracking-wide"
          whileHover={{ scale: 1.05, x: 5 }}
        >
          {label}
        </motion.div>
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
      
      <motion.div 
        className={`${reverse ? 'md:order-1' : ''}`}
        initial={{ opacity: 0, scale: 0.8, x: reverse ? -50 : 50 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: reverse ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-16 flex items-center justify-center overflow-hidden group cursor-pointer shadow-lg"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Animated background orbs */}
          <motion.div 
            className="absolute w-40 h-40 bg-blue-200/30 rounded-full blur-3xl -top-12 -left-12"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-32 h-32 bg-purple-200/30 rounded-full blur-3xl -bottom-8 -right-8"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, -90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 15, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon 
              className="w-36 h-36 text-blue-600 relative z-10 drop-shadow-2xl" 
              strokeWidth={1.5} 
            />
          </motion.div>
          
          {/* Shimmer effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: CheckCircle2,
      label: "Todo List",
      title: "Organize life",
      description: "Whether it's work projects, personal tasks, or study plans, organize and confidently tackle everything in your life."
    },
    {
      icon: Calendar,
      label: "Calendar Views",
      title: "Easily plan your schedule",
      description: "Different calendar views like monthly, weekly, daily, and agenda offer diverse choices for planning your time more efficiently.",
      reverse: true
    },
    {
      icon: Columns3,
      label: "Flexible Views",
      title: "Work in your preferred style",
      description: "Switch between List, Kanban, and Timeline views to visualize your tasks in the way that works best for you and your workflow."
    },
    {
      icon: Clock,
      label: "Pomodoro & Focus",
      title: "Stay focused and productive",
      description: "Built-in Pomodoro timer, white noise, and habit tracking help you maintain focus and build better productivity habits.",
      reverse: true
    },
    {
      icon: Zap,
      label: "Smart Input",
      title: "Capture ideas instantly",
      description: "Add tasks naturally with voice input, smart date parsing, and quick entry shortcuts. Your thoughts become organized tasks in seconds."
    },
    {
      icon: TrendingUp,
      label: "Statistics & Reports",
      title: "Track your progress",
      description: "Visualize your productivity with detailed statistics, completion trends, and achievement reports to stay motivated and improve.",
      reverse: true
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
