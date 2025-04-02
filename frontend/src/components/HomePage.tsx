'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingBadge from './RatingBadge';

// Mock data for the carousel (would be fetched from API in a real implementation)
const featuredGames = [
  {
    id: 1,
    title: "Catan",
    coverImage: "/images/catan.jpg",
    globalScore: 4.2,
    shortDescription: "A classic strategy game of resource management and trading."
  },
  {
    id: 2,
    title: "Pandemic",
    coverImage: "/images/pandemic.jpg",
    globalScore: 4.5,
    shortDescription: "Work together to stop the spread of diseases and save humanity."
  },
  {
    id: 3,
    title: "Ticket to Ride",
    coverImage: "/images/ticket-to-ride.jpg",
    globalScore: 4.3,
    shortDescription: "Connect cities with train routes across the country."
  }
];

// Mock data for featured reviews
const reviewedGames = [
  {
    id: 1,
    title: "Catan",
    coverImage: "/images/catan.jpg",
    reviewDate: "2023-11-15",
    score: 4.5,
    reviewCount: 128,
    shortDescription: "A classic strategy game of resource management and trading."
  },
  {
    id: 2,
    title: "Pandemic",
    coverImage: "/images/pandemic.jpg",
    reviewDate: "2023-12-03",
    score: 4.8,
    reviewCount: 94,
    shortDescription: "Work together to stop the spread of diseases and save humanity."
  },
  {
    id: 3,
    title: "Ticket to Ride",
    coverImage: "/images/ticket-to-ride.jpg",
    reviewDate: "2023-10-22",
    score: 4.3,
    reviewCount: 112,
    shortDescription: "Connect cities with train routes across the country."
  },
  {
    id: 4,
    title: "Azul",
    coverImage: "/images/azul.jpg",
    reviewDate: "2024-01-05",
    score: 4.6,
    reviewCount: 87,
    shortDescription: "Compete to create the most beautiful mosaic pattern."
  },
  {
    id: 5,
    title: "Wingspan",
    coverImage: "/images/wingspan.jpg",
    reviewDate: "2024-02-18",
    score: 4.7,
    reviewCount: 76,
    shortDescription: "Build your nature preserve by attracting birds with unique abilities."
  },
  {
    id: 6,
    title: "7 Wonders",
    coverImage: "/images/7wonders.jpg",
    reviewDate: "2023-09-30",
    score: 4.4,
    reviewCount: 103,
    shortDescription: "Build your ancient civilization through three ages of development."
  }
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [filters, setFilters] = useState({
    playerCount: "",
    duration: "",
    ageRange: "",
    category: ""
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section with Carousel */}
      <section className="relative h-[500px] overflow-hidden bg-gray-900">
        {/* Content for active slide */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Fallback background color if image doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900"></div>
            
            {/* We would use real images in production, using a colored div for now */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-12">
              <div className="text-center max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {featuredGames[activeSlide].title}
                </h1>
                <div className="mb-4 flex justify-center">
                  <RatingBadge 
                    rating={featuredGames[activeSlide].globalScore} 
                    size="large"
                    showDescription={true}
                  />
                </div>
                <p className="text-xl text-white mb-8">
                  {featuredGames[activeSlide].shortDescription}
                </p>
                <Link
                  href={`/games/${featuredGames[activeSlide].id}`}
                  className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition-colors"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel Navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Filter Bar */}
      <section className="bg-gray-100 py-4 px-4 md:px-8 lg:px-12 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="relative">
            <label htmlFor="playerCount" className="block text-sm font-medium text-gray-700 mb-1">Players</label>
            <select
              id="playerCount"
              value={filters.playerCount}
              onChange={(e) => handleFilterChange('playerCount', e.target.value)}
              className="rounded-full border-gray-300 shadow-sm py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1 player</option>
              <option value="2">2 players</option>
              <option value="3-4">3-4 players</option>
              <option value="5+">5+ players</option>
            </select>
          </div>
          
          <div className="relative">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              id="duration"
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="rounded-full border-gray-300 shadow-sm py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="short">&lt; 30 min</option>
              <option value="medium">30-60 min</option>
              <option value="long">1-2 hours</option>
              <option value="very-long">2+ hours</option>
            </select>
          </div>
          
          <div className="relative">
            <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <select
              id="ageRange"
              value={filters.ageRange}
              onChange={(e) => handleFilterChange('ageRange', e.target.value)}
              className="rounded-full border-gray-300 shadow-sm py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="kids">Kids (4+)</option>
              <option value="family">Family (8+)</option>
              <option value="teen">Teen (13+)</option>
              <option value="adult">Adult (18+)</option>
            </select>
          </div>
          
          <div className="relative">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="rounded-full border-gray-300 shadow-sm py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="strategy">Strategy</option>
              <option value="family">Family</option>
              <option value="party">Party</option>
              <option value="cooperative">Cooperative</option>
              <option value="deck-building">Deck Building</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Reviewed Board Games</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewedGames.map(game => (
            <div key={game.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for game image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="absolute top-2 right-2">
                  <RatingBadge 
                    rating={game.score} 
                    size="small" 
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                <p className="text-gray-700 text-sm mb-3">{game.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{game.reviewCount} reviews</span>
                  <Link
                    href={`/games/${game.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link
            href="/games"
            className="inline-flex items-center bg-gray-200 text-gray-800 py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
          >
            Browse All Games
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
} 