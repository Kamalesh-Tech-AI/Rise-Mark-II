import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../lib/utils';
import { Content } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface ContentCardProps {
  content: Content;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const categoryLabels = {
    'project': 'Project',
    'portfolio': 'Portfolio',
    'website': 'Website',
    'phd': 'PhD Research',
    'custom': 'Custom Work'
  };
  
  const categoryColors = {
    'project': 'bg-blue-100 text-blue-800',
    'portfolio': 'bg-purple-100 text-purple-800',
    'website': 'bg-green-100 text-green-800',
    'phd': 'bg-amber-100 text-amber-800',
    'custom': 'bg-teal-100 text-teal-800'
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={content.previewImages[0]} 
          alt={content.title}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${categoryColors[content.category]}`}>
          {categoryLabels[content.category]}
        </span>
        {content.rating && (
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
            <Star className="w-3.5 h-3.5 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-xs font-medium">{content.rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-1">
        <Link to={`/content/${content.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
            {content.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {content.description}
        </p>
        <div className="flex items-center mb-3">
          <span className="text-xs text-gray-500">By</span>
          <Link to={`/seller/${content.sellerId}`} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ml-1">
            {content.sellerName}
          </Link>
        </div>
        <div className="flex flex-wrap gap-1 mb-1">
          {content.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              +{content.tags.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-gray-900">{formatCurrency(content.price)}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Eye className="w-4 h-4" />}
            >
              Preview
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};