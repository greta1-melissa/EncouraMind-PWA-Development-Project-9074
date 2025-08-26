import React from 'react';
import {motion} from 'framer-motion';

const Logo = ({ size = 'md', className = '', showText = false, spinning = false }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const logoUrl = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg";

  return (
    <div className={`relative flex items-center justify-center ${showText ? 'flex-col' : ''} ${className}`}>
      <motion.div 
        className={`${sizeClass} flex items-center justify-center`}
        whileHover={!spinning ? { scale: 1.05 } : {}}
        whileTap={!spinning ? { scale: 0.95 } : {}}
        animate={spinning ? { rotate: 360 } : {}}
        transition={spinning ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
      >
        <img 
          src={logoUrl} 
          alt="EncouraMind Logo" 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }} 
        />
        
        {/* Fallback SVG - hidden by default, only shows if image fails */}
        <div className="hidden w-full h-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
            <path d="M50 15C40 15 32 23 30 33C28 35 26 38 26 42C26 48 30 53 36 55C34 58 33 62 33 66C33 75 40 82 49 82H51C60 82 67 75 67 66C67 62 66 58 64 55C70 53 74 48 74 42C74 38 72 35 70 33C68 23 60 15 50 15Z" fill="white" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {showText && size !== 'sm' && (
        <span className="text-sm font-semibold mt-2 text-center bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          EncouraMind
        </span>
      )}
    </div>
  );
};

export default Logo;