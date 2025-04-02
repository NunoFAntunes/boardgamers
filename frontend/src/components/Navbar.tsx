'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  tooltip: string;
}

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
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
      name: 'Profile',
      href: '/profile',
      icon: '/icons/player.svg',
      tooltip: 'Your Profile'
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
    };
    return colors[name as keyof typeof colors] || '#ffffff';
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-3">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
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
            
            {/* Tooltip */}
            {hoveredItem === item.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap">
                {item.tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 