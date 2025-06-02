import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CustomProjectForm } from '../components/custom/CustomProjectForm';
import { ProgressTracker } from '../components/custom/ProgressTracker';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowRight, CheckCircle, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export const CustomProjectsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { customProjects } = useContentStore();
  const [showForm, setShowForm] = useState(false);
  
  // Filter projects to only show those belonging to the current user
  const userProjects = isAuthenticated 
    ? customProjects.filter(project => project.buyerId === user?.id)
    : [];
  
  // Find the active project (most recent non-delivered project)
  const activeProject = userProjects.length > 0 
    ? userProjects.reduce((latest, current) => 
        current.status !== 'delivered' && new Date(current.createdAt) > new Date(latest.createdAt) 
          ? current 
          : latest, 
        userProjects[0]
      )
    : null;
  
  // Sample project for demonstration (if no active project exists)
  const sampleProject = {
    id: 'sample',
    title: 'Sample Project',
    description: 'This is a sample project to demonstrate progress tracking',
    buyerId: 'user1',
    buyerName: 'John Doe',
    status: 'in_progress' as const,
    requirements: 'Sample requirements',
    progress: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const projectToShow = activeProject || sampleProject;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Custom Project Requests</h1>
            <p className="text-lg mb-8 text-blue-100">
              Can't find what you're looking for? Request a custom project tailored 
              to your specific needs, built by our top developers.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => setShowForm(true)}
            >
              Start Your Custom Request
            </Button>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {showForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Custom Project Request</CardTitle>
                  <p className="text-gray-600">
                    Fill in the details below to help us understand your requirements.
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomProjectForm />
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>How Custom Projects Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                          <MessageSquare className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">1. Submit Your Request</h3>
                          <p className="text-gray-600">
                            Describe your project in detail, including specific requirements, 
                            technologies, features, timeline, and budget expectations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-purple-100 rounded-full p-3 mr-4">
                          <CheckCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">2. Developer Assignment</h3>
                          <p className="text-gray-600">
                            Our administrators review your request and assign it to the best 
                            qualified developer based on expertise and availability.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-green-100 rounded-full p-3 mr-4">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">3. Development & Progress Tracking</h3>
                          <p className="text-gray-600">
                            Track your project's progress in real-time as the developer works on it.
                            You'll receive updates at each milestone.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-amber-100 rounded-full p-3 mr-4">
                          <ShieldCheck className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">4. Security Review & Delivery</h3>
                          <p className="text-gray-600">
                            Before delivery, your project undergoes security checks to ensure quality and safety.
                            Once approved, you'll receive the complete project.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button 
                        size="lg" 
                        onClick={() => setShowForm(true)}
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                      >
                        Start Your Custom Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">How much does a custom project cost?</h3>
                        <p className="text-gray-600">
                          Project costs vary based on complexity, requirements, and timeline. You can 
                          specify your budget range in the request form, and we'll work within it.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1">How long does a custom project take?</h3>
                        <p className="text-gray-600">
                          Timeline depends on project scope and complexity. Simple projects may take 
                          1-2 weeks, while complex ones could require several months.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Can I communicate with the developer?</h3>
                        <p className="text-gray-600">
                          Yes, you'll have a secure communication channel with your assigned developer 
                          to clarify requirements and provide feedback throughout the process.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1">What if I'm not satisfied with the result?</h3>
                        <p className="text-gray-600">
                          We offer revision cycles to ensure your satisfaction. If the delivered project doesn't 
                          meet the agreed requirements, we'll work to address your concerns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{isAuthenticated ? 'Your Project Progress' : 'Project Progress Example'}</CardTitle>
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500">
                    <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link> to 
                    see your actual projects
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ProgressTracker project={projectToShow} />
                
                {!isAuthenticated && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <p className="text-gray-600 mb-4">
                      Track your custom project from initial developer selection to final delivery.
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Link to="/login">
                        <Button variant="outline" fullWidth>
                          Log In
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="primary" fullWidth>
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
                
                {isAuthenticated && userProjects.length === 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <p className="text-gray-600 mb-4">
                      You don't have any custom projects yet. Start your first request today!
                    </p>
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => setShowForm(true)}
                    >
                      Start Custom Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};