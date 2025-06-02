import React from 'react';
import { ContentCard } from './ContentCard';
import { Content, ContentCategory } from '../../types';

interface ContentGridProps {
  contents: Content[];
  category?: ContentCategory | 'all';
}

export const ContentGrid: React.FC<ContentGridProps> = ({ 
  contents,
  category = 'all'
}) => {
  const filteredContents = category === 'all'
    ? contents
    : contents.filter(content => content.category === category);
    
  if (filteredContents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No content available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredContents.map(content => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
};