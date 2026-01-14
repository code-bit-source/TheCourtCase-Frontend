import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Inbox, Calendar, List, MoreHorizontal, Download, ArrowRight, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleDownload = () => {
    // Download functionality
    console.log('Download app');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
          >
            Stay Organized, Stay Creative.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Join millions of people to capture ideas, organize life, and do something creative.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <Button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={handleDownload}
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-gray-700 hover:bg-white hover:border-blue-400 rounded-full px-10 py-6 text-lg font-medium hover:scale-105 transition-all duration-300 group"
            >
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              Download
            </Button>
          </motion.div>
        </motion.div>

        {/* Desktop & Mobile Device Mockups */}
        <motion.div 
          className="relative max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Main Desktop Mockup with Shadow */}
            <motion.div 
              className="relative z-10"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Desktop Frame */}
              <div className="bg-gray-200 rounded-2xl p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-white rounded-xl overflow-hidden shadow-inner">
                  {/* Browser Chrome */}
                  <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-4 py-1.5 text-xs text-gray-500 border border-gray-200 max-w-md">
                        https://taskflow.app
                      </div>
                    </div>
                  </div>

                  {/* App Interface - 3 Column Layout */}
                  <div className="grid grid-cols-12 h-[480px]">
                    {/* Left Sidebar */}
                    <motion.div 
                      className="col-span-3 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="space-y-1">
                        <motion.div 
                          className="flex items-center space-x-3 p-2.5 rounded-lg bg-white shadow-sm cursor-pointer border border-blue-100"
                          whileHover={{ scale: 1.03, x: 3 }}
                        >
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-gray-900">Today</div>
                            <div className="text-xs text-gray-500">4</div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                          whileHover={{ scale: 1.03, x: 3 }}
                        >
                          <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-700">Next 7 Days</div>
                            <div className="text-xs text-gray-500">94</div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                          whileHover={{ scale: 1.03, x: 3 }}
                        >
                          <Inbox className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-700">Inbox</div>
                            <div className="text-xs text-gray-500">10</div>
                          </div>
                        </motion.div>

                        <div className="pt-3 mt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-400 uppercase mb-1.5 px-2.5 font-semibold">Lists</div>
                          <div className="space-y-0.5">
                            {[
                              { name: 'Work Tasks', count: 23, color: 'bg-gray-900' },
                              { name: 'Study Goals', count: 37, color: 'bg-green-500' },
                              { name: 'Travel Plans', count: 14, color: 'bg-blue-500' }
                            ].map((list, idx) => (
                              <motion.div 
                                key={idx}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
                                whileHover={{ scale: 1.03, x: 3 }}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${list.color} flex-shrink-0`}></div>
                                <div className="text-xs text-gray-700 flex-1 truncate">{list.name}</div>
                                <div className="text-xs text-gray-400">{list.count}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Middle - Task List */}
                    <motion.div 
                      className="col-span-5 border-r border-gray-200 p-5 overflow-y-auto bg-white"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-gray-900">Next 7 Days</h2>
                        <div className="flex items-center space-x-1">
                          <motion.button 
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <List className="w-4 h-4 text-gray-600" />
                          </motion.button>
                          <motion.button 
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-gray-400 uppercase mb-2 font-semibold">Today · 4</div>
                        
                        {[
                          { name: 'Morning Run', time: '07:00', id: 1 },
                          { name: 'Interview Mr. Li', time: '09:00', id: 2 },
                          { name: 'Prepare Work Report', time: '13:00', id: 3, highlighted: true },
                          { name: 'Evening Reading', time: '22:00', id: 4 }
                        ].map((task) => (
                          <motion.div 
                            key={task.id}
                            className={`flex items-start space-x-2.5 p-2.5 rounded-lg transition-all cursor-pointer ${
                              task.highlighted ? 'bg-blue-50 shadow-sm border border-blue-100' : 'hover:bg-gray-50'
                            }`}
                            onHoverStart={() => setHoveredTask(task.id)}
                            onHoverEnd={() => setHoveredTask(null)}
                            whileHover={{ x: 3 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + task.id * 0.05 }}
                          >
                            <motion.input 
                              type="checkbox" 
                              className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer flex-shrink-0"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs ${task.highlighted ? 'font-medium text-gray-900' : 'text-gray-800'}`}>
                                {task.name}
                              </div>
                              <motion.div 
                                className="text-xs text-blue-600 mt-0.5"
                                animate={{ opacity: hoveredTask === task.id ? 1 : 0.7 }}
                              >
                                {task.time}
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Right - Task Details */}
                    <motion.div 
                      className="col-span-4 bg-gray-50/50 p-5 overflow-y-auto"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900">Prepare Work Report</h3>
                          <motion.button 
                            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>

                        <div className="space-y-2">
                          {[
                            { label: 'Organize Documents', checked: false },
                            { label: 'Prepare Presentation', checked: false }
                          ].map((subtask, idx) => (
                            <motion.div 
                              key={idx}
                              className="flex items-start space-x-2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + idx * 0.1 }}
                              whileHover={{ x: 2 }}
                            >
                              <motion.input 
                                type="checkbox" 
                                className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 cursor-pointer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              />
                              <span className="text-xs text-gray-700">{subtask.label}</span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div 
                          className="pt-3 border-t border-gray-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 }}
                        >
                          <div className="text-xs text-gray-400 mb-1 font-medium">Due Date</div>
                          <div className="text-xs text-blue-600">Today, Sep 5, 13:00-17:00</div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Base */}
              <div className="h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-2xl mx-auto" style={{ width: '60%' }}></div>
            </motion.div>

            {/* Floating Mobile Device Mockup - iPhone Style */}
            <motion.div 
              className="absolute -bottom-12 -right-8 lg:-right-12 hidden lg:block z-20"
              initial={{ opacity: 0, y: 100, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.05, rotate: -3, y: -10 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* iPhone Frame */}
              <div className="relative w-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10"></div>
                
                {/* Screen */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden" style={{ height: '600px' }}>
                  {/* Status Bar */}
                  <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-medium relative z-20">
                    <span className="text-gray-900">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-3 bg-gray-900 rounded-sm"></div>
                        <div className="w-1 h-3 bg-gray-900 rounded-sm"></div>
                        <div className="w-1 h-3 bg-gray-600 rounded-sm"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-sm"></div>
                      </div>
                      <svg className="w-6 h-3" viewBox="0 0 24 12" fill="none">
                        <rect x="0" y="0" width="18" height="10" rx="2" fill="#000" />
                        <rect x="20" y="3" width="2" height="4" rx="1" fill="#000" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mobile App Content */}
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-5 h-full">
                    <motion.div 
                      className="text-center mb-6"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-base font-bold text-gray-900">Today</h4>
                      <p className="text-sm text-gray-600">4 tasks</p>
                    </motion.div>
                    
                    <div className="space-y-3">
                      {['Morning Run', 'Interview', 'Work Report', 'Reading'].map((task, idx) => (
                        <motion.div 
                          key={idx}
                          className="bg-white rounded-xl p-3.5 shadow-md"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.1 + idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                            <span className="text-sm text-gray-800 font-medium">{task}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
