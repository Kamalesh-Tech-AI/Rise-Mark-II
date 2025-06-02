import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CustomProject, CustomProjectStatus } from '../../types';
import { cn } from '../../lib/utils';

interface ProgressTrackerProps {
  project: CustomProject;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ project }) => {
  const steps = [
    { id: 'developer_selection', label: 'Developer Selection' },
    { id: 'in_progress', label: 'Project Making' },
    { id: 'completed', label: 'Project Completion' },
    { id: 'security_check', label: 'Security Checks' },
    { id: 'delivered', label: 'Completed' },
  ];

  // Helper to determine if a step is completed
  const isCompleted = (stepId: string): boolean => {
    const statusOrder: CustomProjectStatus[] = [
      'pending', 
      'developer_selection', 
      'in_progress', 
      'completed', 
      'security_check', 
      'delivered'
    ];
    
    const currentIndex = statusOrder.indexOf(project.status);
    const stepIndex = statusOrder.indexOf(stepId as CustomProjectStatus);
    
    return stepIndex < currentIndex || project.status === stepId;
  };
  
  // Helper to determine if a step is the current step
  const isCurrent = (stepId: string): boolean => {
    return project.status === stepId;
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
        <span className="text-sm font-medium text-gray-600">{Math.round(project.progress)}% Complete</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      
      {/* Steps */}
      <ol className="relative border-l border-gray-300 ml-3 space-y-6">
        {steps.map((step, index) => (
          <li key={step.id} className="ml-6">
            <span 
              className={cn(
                "absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-2 ring-white",
                isCompleted(step.id) 
                  ? "bg-blue-600 text-white" 
                  : isCurrent(step.id)
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-gray-100 text-gray-500"
              )}
            >
              {isCompleted(step.id) ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </span>
            <div className={cn(
              "ml-2",
              isCompleted(step.id) 
                ? "text-gray-900" 
                : isCurrent(step.id)
                  ? "text-blue-600" 
                  : "text-gray-500"
            )}>
              <h4 className="font-medium">{step.label}</h4>
              {isCurrent(step.id) && (
                <p className="text-sm text-gray-600 mt-1">
                  {step.id === 'developer_selection' && 'We are finding the best developer for your project.'}
                  {step.id === 'in_progress' && 'Your project is currently being worked on.'}
                  {step.id === 'completed' && 'Your project is complete and waiting for final checks.'}
                  {step.id === 'security_check' && 'Security review is in progress.'}
                  {step.id === 'delivered' && 'Your project has been delivered successfully!'}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};