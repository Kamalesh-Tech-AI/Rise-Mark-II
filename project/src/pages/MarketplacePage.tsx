import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CategoryFilter } from '../components/marketplace/CategoryFilter';
import { ContentGrid } from '../components/marketplace/ContentGrid';
import { ContentCategory } from '../types';
import { useContentStore } from '../store/contentStore';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const MarketplacePage: React.FC = () => {
  const { marketplaceContent } = useContentStore();
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sort content based on selected option
  const sortedContent = [...marketplaceContent].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="bg-blue-600 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
          <p className="text-blue-100 max-w-2xl">
            Browse our collection of digital intellectual properties. Find projects, portfolios, 
            websites, and research papers from talented creators worldwide.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>
        
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="text-gray-700">
            {marketplaceContent.length} items available
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="sm"
              leftIcon={<Filter className="w-4 h-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            
            <select 
              className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        
        {/* Advanced Filters - Collapsible */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <span className="text-gray-500">-</span>
                  <input 
                    type="text"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Added
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
              >
                Reset
              </Button>
              <Button variant="primary" size="sm">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        <ContentGrid contents={sortedContent} category={selectedCategory} />
      </div>
    </Layout>
  );
};