'use client';

import { getRatingColor, getRatingDescription } from '@/utils/ratings';
import { boardGameElements } from '@/utils/theme';

interface RatingBadgeProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  showDescription?: boolean;
  className?: string;
}

export default function RatingBadge({
  rating,
  size = 'medium',
  showText = true,
  showDescription = false,
  className = '',
}: RatingBadgeProps) {
  const sizeClasses = boardGameElements.diceRating.size[size];
  const color = getRatingColor(rating);
  const description = getRatingDescription(rating);
  
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses} ${boardGameElements.diceRating.style} ${className}`}
        style={{
          backgroundColor: color,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '2px solid white',
        }}
      >
        {showText && (
          <span className="text-white">
            {rating.toFixed(1)}
          </span>
        )}
      </div>
      
      {showDescription && (
        <div className="mt-1 text-xs font-medium" style={{ color }}>
          {description}
        </div>
      )}
    </div>
  );
} 