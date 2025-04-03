'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/AuthContext';
import LoginModal from './LoginModal';
import Logo from './Logo';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, isReviewerRole, logout, user } = useAuth();
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      <div className={`fixed top-2 z-50 left-1/2 transform -translate-x-1/2 w-[calc(100%-16px)] max-w-7xl transition-all duration-300 ${isScrolled ? 'top-1' : 'top-2'}`}>
        <div className={`mx-auto rounded-xl bg-black/30 backdrop-blur-xl ${isScrolled ? 'shadow-xl' : ''}`}>
          <div className="px-4 h-12 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="small" withText={true} />
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center gap-2">
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
                      className={`flex items-center px-3 h-8 rounded-full text-white text-sm transition-all duration-200 ${
                        hoveredItem === item.name ? 'bg-white/30' : 'hover:bg-white/10'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 mr-1.5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getIconColor(item.name) }}
                      ></div>
                      {item.name}
                      {item.name === 'Profile' && isLoggedIn && (
                        <button 
                          onClick={handleLogout} 
                          className="ml-2 text-xs text-red-300 hover:text-red-200"
                          aria-label="Logout"
                        >
                          (Logout)
                        </button>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={item.href}
                      className={`flex items-center px-3 h-8 rounded-full text-white text-sm transition-all duration-200 ${
                        hoveredItem === item.name ? 'bg-white/30' : 'hover:bg-white/10'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 mr-1.5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getIconColor(item.name) }}
                      ></div>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
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