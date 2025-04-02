import { colors } from './theme';

// Get color based on rating value
export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return colors.ratings.excellent;
  if (rating >= 3.5) return colors.ratings.good;
  if (rating >= 2.5) return colors.ratings.average;
  return colors.ratings.poor;
};

// Get text description based on rating value
export const getRatingDescription = (rating: number): string => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 3.5) return 'Good';
  if (rating >= 2.5) return 'Average';
  if (rating >= 1.5) return 'Below Average';
  return 'Poor';
};

// Convert decimal rating to star representation (e.g., "★★★★☆")
export const getRatingStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '½';
  stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
  
  return stars;
};

// Convert decimal rating to dice representation (for UI visualization)
export const getRatingDice = (rating: number): number => {
  // Round to nearest 0.5
  return Math.round(rating * 2) / 2;
};

// Get CSS classes for a rating badge/indicator
export const getRatingClasses = (rating: number): string => {
  const baseClasses = 'font-bold rounded-full flex items-center justify-center';
  
  if (rating >= 4.5) return `${baseClasses} bg-green-100 text-green-800`;
  if (rating >= 3.5) return `${baseClasses} bg-blue-100 text-blue-800`;
  if (rating >= 2.5) return `${baseClasses} bg-yellow-100 text-yellow-800`;
  return `${baseClasses} bg-red-100 text-red-800`;
};

export default {
  getRatingColor,
  getRatingDescription,
  getRatingStars,
  getRatingDice,
  getRatingClasses,
}; 