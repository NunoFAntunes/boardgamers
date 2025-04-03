'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/AuthContext';
import LoginModal from './LoginModal';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  tooltip: string;
  requiresAuth?: boolean;
  reviewerOnly?: boolean;
}

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, isReviewerRole, logout, user } = useAuth();
  
  const navItems: NavItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: '/icons/dice.svg',
      tooltip: 'Home'
    },
    {
      name: 'Games',
      href: '/games',
      icon: '/icons/meeple.svg',
      tooltip: 'Browse Games'
    },
    {
      name: 'Reviews',
      href: '/reviews',
      icon: '/icons/cards.svg',
      tooltip: 'Reviews'
    },
    {
      name: 'Search',
      href: '/search',
      icon: '/icons/magnifier.svg',
      tooltip: 'Search Games'
    },
    {
      name: 'Create Review',
      href: '/reviews/create',
      icon: '/icons/create.svg',
      tooltip: 'Create New Review',
      requiresAuth: true,
      reviewerOnly: true
    },
    {
      name: isLoggedIn ? 'Profile' : 'Login',
      href: isLoggedIn ? '/profile' : '#',
      icon: '/icons/player.svg',
      tooltip: isLoggedIn ? `${user?.email || 'Your Profile'}` : 'Login',
      requiresAuth: false
    },
  ];

  // Helper function to get an icon color based on the item name
  const getIconColor = (name: string) => {
    const colors = {
      'Home': '#ff9933',       // Orange
      'Games': '#66cc66',      // Green
      'Reviews': '#6699ff',    // Blue
      'Search': '#ff66cc',     // Pink
      'Profile': '#cc99ff',    // Purple
      'Login': '#cc99ff',      // Purple (same as Profile)
      'Create Review': '#ffcc00', // Yellow
    };
    return colors[name as keyof typeof colors] || '#ffffff';
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Already logged in, go to profile
      return;
    }
    // Open login modal
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    // Refresh the page or update state as needed
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    // Refresh the page
    window.location.reload();
  };

  // Filter items based on auth state and role
  const filteredNavItems = navItems.filter(item => {
    if (item.reviewerOnly && (!isLoggedIn || !isReviewerRole)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-3">
          {filteredNavItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name === 'Login' || item.name === 'Profile' ? (
                <div 
                  onClick={item.name === 'Login' ? handleLoginClick : undefined}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                    hoveredItem === item.name ? 'scale-125 bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-8 h-8">
                    <span className="sr-only">{item.name}</span>
                    {/* Custom styled icon representation */}
                    <div 
                      className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm rounded-lg"
                      style={{ backgroundColor: getIconColor(item.name) }}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                    hoveredItem === item.name ? 'scale-125 bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-8 h-8">
                    <span className="sr-only">{item.name}</span>
                    {/* Custom styled icon representation */}
                    <div 
                      className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm rounded-lg"
                      style={{ backgroundColor: getIconColor(item.name) }}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </Link>
              )}
              
              {/* Tooltip */}
              {hoveredItem === item.name && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap">
                  {item.tooltip}
                  {item.name === 'Profile' && isLoggedIn && (
                    <button 
                      onClick={handleLogout} 
                      className="ml-2 text-xs text-red-400 hover:text-red-300"
                    >
                      (Logout)
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
} 