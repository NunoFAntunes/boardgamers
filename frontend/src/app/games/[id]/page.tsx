'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RatingBadge from '@/components/RatingBadge';
import { componentStyles } from '@/utils/theme';

// Mock data for a single game (would be fetched from API in a real implementation)
const mockGameData = {
  id: 1,
  title: "Catan",
  publisher: "Kosmos",
  releaseYear: 1995,
  heroImage: "/images/catan-hero.jpg",
  globalScore: 4.5,
  description: "Players build settlements, cities, and roads on the island of Catan, while trading and acquiring resources. The goal is to reach 10 victory points through clever placement and trading strategies.",
  playerCount: "3-4",
  duration: "60-120 minutes",
  ageRecommendation: "10+",
  complexity: 2.3,
  categories: ["Strategy", "Negotiation", "Resource Management"],
  mechanics: ["Dice Rolling", "Trading", "Hex Grid"],
  reviews: [
    {
      id: 1,
      reviewerName: "Alex Johnson",
      reviewerImage: "/images/reviewers/alex.jpg",
      datePlayed: "2023-12-15",
      categoryScores: {
        gameplay: 4.5,
        components: 4.0,
        complexity: 3.0,
        replayability: 4.7,
        artDesign: 3.8
      },
      notes: "A modern classic that revolutionized board gaming. The gameplay remains engaging after all these years, although the luck factor can sometimes be frustrating. Component quality is excellent, and the modular board ensures great replayability."
    },
    {
      id: 2,
      reviewerName: "Sarah Chen",
      reviewerImage: "/images/reviewers/sarah.jpg",
      datePlayed: "2024-01-20",
      categoryScores: {
        gameplay: 4.2,
        components: 4.5,
        complexity: 2.5,
        replayability: 4.8,
        artDesign: 4.0
      },
      notes: "Catan still holds up well as a gateway game. The trading aspect creates interesting player dynamics, and the variable setup keeps things fresh. The base game can become repetitive for experienced gamers, but expansions address this issue nicely."
    },
    {
      id: 3,
      reviewerName: "Marcus Williams",
      reviewerImage: "/images/reviewers/marcus.jpg",
      datePlayed: "2023-11-05",
      categoryScores: {
        gameplay: 4.0,
        components: 4.2,
        complexity: 2.8,
        replayability: 4.3,
        artDesign: 3.5
      },
      notes: "The resource gathering and trading mechanics create a perfect balance of strategy and player interaction. While the base game can feel somewhat limited after many plays, it remains a staple at our game nights due to its accessibility and engaging dynamics."
    }
  ]
};

export default function GameDetailPage() {
  const params = useParams();
  const [game, setGame] = useState(mockGameData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch the game data from an API
    // const fetchGame = async () => {
    //   try {
    //     const response = await fetch(`/api/games/${params.id}`);
    //     const data = await response.json();
    //     setGame(data);
    //   } catch (error) {
    //     console.error("Error fetching game data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Simulate API fetch with mock data
    setTimeout(() => {
      setLoading(false);
    }, 500);
    
    // fetchGame();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calculate average scores across all reviews
  const calculateAverageScores = () => {
    const scores = {
      gameplay: 0,
      components: 0,
      complexity: 0,
      replayability: 0,
      artDesign: 0
    };
    
    game.reviews.forEach(review => {
      scores.gameplay += review.categoryScores.gameplay;
      scores.components += review.categoryScores.components;
      scores.complexity += review.categoryScores.complexity;
      scores.replayability += review.categoryScores.replayability;
      scores.artDesign += review.categoryScores.artDesign;
    });
    
    return {
      gameplay: scores.gameplay / game.reviews.length,
      components: scores.components / game.reviews.length,
      complexity: scores.complexity / game.reviews.length,
      replayability: scores.replayability / game.reviews.length,
      artDesign: scores.artDesign / game.reviews.length
    };
  };
  
  const averageScores = calculateAverageScores();

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900">
          {/* In production, we would use a real image here */}
          {/* <Image src={game.heroImage} layout="fill" objectFit="cover" alt={game.title} /> */}
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{game.title}</h1>
            <div className="text-lg text-white/80 mb-6">{game.publisher} • {game.releaseYear}</div>
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2 md:space-x-4">
                <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {game.playerCount}
                </div>
                <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {game.duration}
                </div>
                <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {game.ageRecommendation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-bold mb-4">About the Game</h2>
              <p>{game.description}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Category Scores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(averageScores).map(([category, score]) => (
                  <div key={category} className="bg-white rounded-lg shadow p-4">
                    <div className="text-gray-600 capitalize mb-2">{category}</div>
                    <div className="flex justify-between items-center">
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="font-bold">{score.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              <div className="space-y-8">
                {game.reviews.map(review => (
                  <div key={review.id} className={componentStyles.reviewCard.base}>
                    <div className={componentStyles.reviewCard.header}>
                      <div className="flex items-center">
                        <div className="bg-gray-300 rounded-full w-10 h-10 mr-3 overflow-hidden">
                          {/* In production, we would use a real image here */}
                          {/* <Image src={review.reviewerImage} width={40} height={40} alt={review.reviewerName} /> */}
                        </div>
                        <div>
                          <div className="font-bold">{review.reviewerName}</div>
                          <div className="text-sm text-gray-500">Played on {new Date(review.datePlayed).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                    <div className={componentStyles.reviewCard.body}>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Ratings</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(review.categoryScores).map(([category, score]) => (
                            <div key={category} className="flex items-center">
                              <div className="w-full">
                                <div className="text-sm text-gray-600 capitalize mb-1">{category}</div>
                                <div className="flex justify-between items-center">
                                  <div className="w-3/4 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${(score / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="font-medium text-sm">{score.toFixed(1)}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Review Notes</h3>
                        <p className="text-gray-700">{review.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="lg:col-span-1">
            {/* Global Score Card */}
            <div className={`${componentStyles.gameDetail.scoreCard} mb-8`}>
              <div className="text-white/80 mb-2">Global Score</div>
              <div className="flex items-center">
                <RatingBadge rating={game.globalScore} size="large" showDescription={true} />
                <div className="ml-4 text-2xl font-bold">{game.globalScore.toFixed(1)}</div>
              </div>
              <div className="mt-4 text-sm">Based on {game.reviews.length} reviews</div>
            </div>

            {/* Game Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Game Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Publisher</dt>
                  <dd className="font-medium">{game.publisher}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Release Year</dt>
                  <dd className="font-medium">{game.releaseYear}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Player Count</dt>
                  <dd className="font-medium">{game.playerCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Play Time</dt>
                  <dd className="font-medium">{game.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="font-medium">{game.ageRecommendation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Complexity</dt>
                  <dd className="font-medium">{game.complexity} / 5</dd>
                </div>
              </dl>
            </div>

            {/* Categories & Mechanics */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {game.categories.map(category => (
                  <span 
                    key={category} 
                    className={`${componentStyles.gameDetail.categoryBadge} bg-blue-100 text-blue-800`}
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Mechanics</h3>
              <div className="flex flex-wrap gap-2">
                {game.mechanics.map(mechanic => (
                  <span 
                    key={mechanic} 
                    className={`${componentStyles.gameDetail.categoryBadge} bg-purple-100 text-purple-800`}
                  >
                    {mechanic}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Games - would be dynamic in a real implementation */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Games</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                  <div>
                    <div className="font-medium">Ticket to Ride</div>
                    <div className="text-sm text-gray-500">4.3 / 5</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                  <div>
                    <div className="font-medium">Carcassonne</div>
                    <div className="text-sm text-gray-500">4.2 / 5</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                  <div>
                    <div className="font-medium">Dominion</div>
                    <div className="text-sm text-gray-500">4.4 / 5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 