// Theme constants for consistent styling throughout the application

// Color palette
export const colors = {
  // Primary brand colors
  primary: {
    blue: '#3B82F6',  // Blue for primary actions
    purple: '#8B5CF6', // Purple for secondary elements
    yellow: '#F59E0B', // Yellow for highlights, ratings, etc.
  },
  
  // Game category colors
  categories: {
    strategy: '#047857',   // Deep green for strategy games
    family: '#2563EB',     // Blue for family games
    party: '#DB2777',      // Pink for party games
    cooperative: '#7C3AED', // Purple for cooperative games
    deckBuilding: '#D97706', // Amber for deck building games
  },
  
  // Rating colors
  ratings: {
    excellent: '#059669', // Green for high ratings
    good: '#0EA5E9',      // Blue for good ratings
    average: '#F59E0B',   // Yellow for average ratings
    poor: '#F43F5E',      // Red for low ratings
  },
  
  // UI grayscale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Typography
export const typography = {
  // Font families as per README
  fontFamily: {
    heading: '"Bitter", serif',
    body: '"Nunito", "Open Sans", sans-serif',
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
};

// Board game-themed elements
export const boardGameElements = {
  // Dice-based ratings
  diceRating: {
    size: {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16',
    },
    style: 'rounded-lg transform rotate-3 flex items-center justify-center font-bold',
  },
  
  // Card-like elements
  gameCard: {
    base: 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300',
    hover: 'transform hover:-translate-y-1',
  },
  
  // Meeple-based indicators
  meepleIndicator: {
    base: 'inline-block relative',
    active: 'text-purple-600',
    inactive: 'text-gray-300',
  },
};

// Component-specific styles
export const componentStyles = {
  // Navigation
  navbar: {
    base: 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-lg rounded-full border border-white/10 shadow-lg',
    item: 'rounded-full transition-all duration-300',
    activeItem: 'scale-125 bg-white/20',
  },
  
  // Game detail
  gameDetail: {
    scoreCard: 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg',
    categoryBadge: 'px-3 py-1 rounded-full text-xs font-medium',
  },
  
  // Review elements
  reviewCard: {
    base: 'bg-white rounded-xl shadow-md overflow-hidden border border-gray-100',
    header: 'border-b border-gray-100 p-4',
    body: 'p-6',
  },
};

export default {
  colors,
  typography,
  boardGameElements,
  componentStyles,
}; 