import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

export default function Logo({ size = 'medium', withText = true }: LogoProps) {
  // Size mappings
  const sizeMap = {
    small: {
      container: 'h-8',
      logo: 'w-8 h-8',
      text: 'text-lg ml-2'
    },
    medium: {
      container: 'h-10',
      logo: 'w-10 h-10',
      text: 'text-xl ml-3'
    },
    large: {
      container: 'h-16',
      logo: 'w-16 h-16',
      text: 'text-3xl ml-4'
    }
  };

  return (
    <Link href="/" className={`flex items-center ${sizeMap[size].container}`}>
      {/* Logo Mark - A stylized dice with a meeple silhouette */}
      <div className={`relative ${sizeMap[size].logo} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg transform rotate-45"></div>
        <div className="absolute inset-1 bg-white/90 rounded-sm transform rotate-45"></div>
        {/* Simulated dots on the dice */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
        {/* Meeple silhouette in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            width="60%" 
            height="60%" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-purple-600"
          >
            <path 
              d="M12,3 C10.8954305,3 10,3.8954305 10,5 C10,6.1045695 10.8954305,7 12,7 C13.1045695,7 14,6.1045695 14,5 C14,3.8954305 13.1045695,3 12,3 Z M8,9 C8,9 7,10 8,12 C9,14 9,16 8,17 L8,21 L16,21 L16,17 C15,16 15,14 16,12 C17,10 16,9 16,9 L8,9 Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      
      {/* Logo Text */}
      {withText && (
        <div className={`font-bold ${sizeMap[size].text}`}>
          <span className="text-blue-600">Board</span>
          <span className="text-purple-600">Gamers</span>
        </div>
      )}
    </Link>
  );
} 