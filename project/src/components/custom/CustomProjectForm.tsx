import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';

interface FormValues {
  title: string;
  description: string;
  category: string;
  requirements: string;
  budget: string;
  timeline: string;
}

export const CustomProjectForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
  
  const onSubmit = async (data: FormValues) => {
    // In a real implementation, this would send data to the backend/n8n
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle success
    alert('Custom project request submitted successfully!');
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a descriptive title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Project Category
        </label>
        <select
          id="category"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
          {...register('category', { required: 'Category is required' })}
        >
          <option value="" disabled>Select a category</option>
          <option value="project">Software Project</option>
          <option value="portfolio">Portfolio</option>
          <option value="website">Website</option>
          <option value="phd">PhD/Research Paper</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Brief Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Briefly describe what you're looking for"
          {...register('description', { required: 'Description is required' })}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
          Detailed Requirements
        </label>
        <textarea
          id="requirements"
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide detailed requirements, technologies, features, etc."
          {...register('requirements', { required: 'Requirements are required' })}
        ></textarea>
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Budget (USD)
          </label>
          <input
            id="budget"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., $500-1000"
            {...register('budget', { required: 'Budget is required' })}
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
            Expected Timeline
          </label>
          <input
            id="timeline"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2 weeks, 1 month"
            {...register('timeline', { required: 'Timeline is required' })}
          />
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          size="lg"
        >
          Submit Request
        </Button>
      </div>
    </form>
  );
};