import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Awards = () => {
  const awards = [
    { title: "Editors' Choice", subtitle: "App Store", delay: 0 },
    { title: "App of the Day", subtitle: "App Store", delay: 0.1 },
    { title: "Editors' Choice", subtitle: "Google Play", delay: 0.2 },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {awards.map((award, idx) => (
            <motion.div 
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: award.delay }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <motion.div 
                className="flex justify-center mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
              >
                <div className="relative">
                  {/* Laurel wreath illustration */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
                    {/* Left laurel */}
                    <path d="M15 40 Q10 30, 15 20 Q18 25, 15 30 Q12 35, 15 40" fill="#D4AF37" opacity="0.7"/>
                    <path d="M15 40 Q10 50, 15 60 Q18 55, 15 50 Q12 45, 15 40" fill="#D4AF37" opacity="0.7"/>
                    {/* Right laurel */}
                    <path d="M65 40 Q70 30, 65 20 Q62 25, 65 30 Q68 35, 65 40" fill="#D4AF37" opacity="0.7"/>
                    <path d="M65 40 Q70 50, 65 60 Q62 55, 65 50 Q68 45, 65 40" fill="#D4AF37" opacity="0.7"/>
                    {/* Center badge */}
                    <circle cx="40" cy="40" r="20" fill="#F59E0B" opacity="0.9"/>
                    <circle cx="40" cy="40" r="16" fill="#FBBF24"/>
                    <text x="40" y="47" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">✓</text>
                  </svg>
                </div>
              </motion.div>
              <motion.div 
                className="text-amber-600 font-bold text-lg mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {award.title}
              </motion.div>
              <div className="text-sm text-gray-500 font-medium">{award.subtitle}</div>
            </motion.div>
          ))}

          {/* Ratings */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <motion.div 
              className="flex justify-center mb-3"
              whileHover={{ scale: 1.2 }}
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                  >
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="text-gray-500 text-sm font-medium mb-1">470k Ratings</div>
            <motion.div 
              className="text-3xl font-bold text-gray-900"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              4.9
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
