'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../utils/AuthContext';

export default function CreateReviewPage() {
  const router = useRouter();
  const { isLoggedIn, isReviewerRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is a reviewer
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    if (!isReviewerRole) {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [isLoggedIn, isReviewerRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Create New Review</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          As a reviewer, you can create detailed, professional reviews for board games. 
          Fill out the form below to submit your review.
        </p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="game" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Game Title
            </label>
            <input
              type="text"
              id="game"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
              placeholder="Enter game title"
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rating (1-10)
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="10"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Review Content
            </label>
            <textarea
              id="content"
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
              placeholder="Write your detailed review here..."
            ></textarea>
          </div>
          
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 