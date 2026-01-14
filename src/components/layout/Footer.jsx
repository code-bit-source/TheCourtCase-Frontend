import React, { useRef } from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Footer = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const footerLinks = {
    Product: ['Features', 'Premium', 'Pricing', 'Enterprise'],
    Download: ['iOS', 'Android', 'macOS', 'Windows', 'Web'],
    Resources: ['Help Center', 'Blog', 'Templates', 'Guide'],
    Company: ['About', 'Careers', 'Contact', 'Press'],
    Legal: ['Privacy', 'Terms', 'Security']
  };

  return (
    <footer ref={ref} className={`${isDark ? 'bg-gray-900 border-t border-gray-800 text-gray-300' : 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([category, links], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
            >
              <h3 className={`text-sm font-semibold uppercase mb-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <motion.li 
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: categoryIdx * 0.1 + linkIdx * 0.05 }}
                  >
                    <motion.a 
                      href="#" 
                      className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors inline-block`}
                      whileHover={{ x: 5, color: '#3b82f6' }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <motion.div 
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>© 2025 All rights reserved.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {[
              { Icon: Twitter, color: '#1DA1F2' },
              { Icon: Facebook, color: '#1877F2' },
              { Icon: Instagram, color: '#E4405F' },
              { Icon: Linkedin, color: '#0A66C2' }
            ].map(({ Icon, color }, idx) => (
              <motion.a 
                key={idx}
                href="#" 
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                whileHover={{ scale: 1.3, y: -3, color }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.7 + idx * 0.1 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
