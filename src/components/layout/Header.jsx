import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Header = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const linkTextClass = isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const authTextClass = isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const buttonClass = isDark ? 'bg-transparent border border-gray-600 text-white hover:bg-gray-800' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, getRoleHomePath } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleUserMenuClick = () => {
    if (user) {
      navigate(getRoleHomePath(user.role));
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-8 border-b transition-all duration-300 ${
        scrolled 
          ? (isDark ? 'bg-black/98 backdrop-blur-md shadow-lg border-gray-800' : 'bg-white/98 backdrop-blur-md shadow-lg border-gray-200') 
          : (isDark ? 'bg-black/90 backdrop-blur-sm border-gray-800' : 'bg-white/90 backdrop-blur-sm border-gray-100')
      } ${isDark ? 'text-white' : 'text-gray-900'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
          onClick={()=>navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-xl font-semibold text-gray-900">TaskFlow</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Download', 'Premium'].map((item, idx) => (
              <motion.span 
                key={item}
                href={`${item.toLowerCase()}`} 
                className={`${linkTextClass} transition-colors font-medium`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                 <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </motion.span>
            ))}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button 
                className={`flex items-center ${linkTextClass} transition-colors font-medium`}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                 <Link to="/resources">Resources</Link>
                {/* <ChevronDown className="ml-1 w-4 h-4" /> */}
              </motion.button>
            </motion.div>
          </div>

          {/* Auth Buttons or User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <button
                        onClick={handleUserMenuClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Go to Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <>
                <motion.a 
                  href="#signin" 
                  onClick={handleSignIn}
                  className={`${authTextClass} transition-colors font-medium`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Sign In
                </motion.a>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={handleSignUp}
                    className={`${buttonClass} rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    Sign Up for Free
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['Features', 'Download', 'Premium', 'Resources'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileTap={{ scale: 0.95, x: 5 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className={`${linkTextClass} block font-medium`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <>
                  <motion.div
                    className="flex items-center space-x-2 py-2 border-t pt-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </motion.div>
                  <motion.button
                    onClick={handleUserMenuClick}
                    className="block text-gray-700 hover:text-gray-900 font-medium text-left w-full"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileTap={{ scale: 0.95, x: 5 }}
                  >
                    Go to Dashboard
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    className="block text-gray-700 hover:text-gray-900 font-medium text-left w-full"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.95, x: 5 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={handleSignIn}
                    className="block text-gray-700 hover:text-gray-900 font-medium text-left w-full"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileTap={{ scale: 0.95, x: 5 }}
                  >
                    Sign In
                  </motion.button>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleSignUp}
                      className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
                    >
                      Sign Up for Free
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
