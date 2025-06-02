import React from 'react';
import { ContentCategory } from '../../types';
import { Code, Layout, Briefcase, GraduationCap, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CategoryFilterProps {
  selectedCategory: ContentCategory | 'all';
  onSelectCategory: (category: ContentCategory | 'all') => void;
}

interface CategoryOption {
  value: ContentCategory | 'all';
  label: string;
  icon: React.ReactNode;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: CategoryOption[] = [
    { value: 'all', label: 'All Categories', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'project', label: 'Projects', icon: <Code className="w-5 h-5" /> },
    { value: 'portfolio', label: 'Portfolios', icon: <Layout className="w-5 h-5" /> },
    { value: 'website', label: 'Websites', icon: <Layout className="w-5 h-5" /> },
    { value: 'phd', label: 'PhD Research', icon: <GraduationCap className="w-5 h-5" /> },
    { value: 'custom', label: 'Custom Work', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={cn(
            'flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          <span className="mr-2">{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};