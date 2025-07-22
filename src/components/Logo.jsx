import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', className = '', showText = false }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const logoUrl = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg";

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${showText ? 'flex-col' : ''} ${className}`}>
      <motion.div
        className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center shadow-lg`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={logoUrl}
          alt="EncouraMind Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        
        {/* Fallback SVG with updated color scheme */}
        <div className="hidden w-full h-full bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
          <svg className="w-3/4 h-3/4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 15C40 15 32 23 30 33C28 35 26 38 26 42C26 48 30 53 36 55C34 58 33 62 33 66C33 75 40 82 49 82H51C60 82 67 75 67 66C67 62 66 58 64 55C70 53 74 48 74 42C74 38 72 35 70 33C68 23 60 15 50 15Z"
              fill="white"
            />
          </svg>
        </div>
      </motion.div>
      
      {showText && size !== 'sm' && (
        <span className="text-sm font-semibold mt-2 text-center bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          EncouraMind
        </span>
      )}
      
      {/* Glow effect with updated colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-xl opacity-70"></div>
    </div>
  );
};

export default Logo;