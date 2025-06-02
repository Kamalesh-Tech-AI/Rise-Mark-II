import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Search, Code, Layout as LayoutIcon, GraduationCap, Settings, ArrowRight } from 'lucide-react';
import { ContentGrid } from '../components/marketplace/ContentGrid';
import { useContentStore } from '../store/contentStore';

export const HomePage: React.FC = () => {
  const { marketplaceContent } = useContentStore();
  const featuredContent = marketplaceContent.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover and Trade Digital Intellectual Properties
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Your secure marketplace for buying, selling, and customizing projects, 
              portfolios, websites, and research papers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/marketplace">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="container mx-auto px-4 pb-8 md:pb-12">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto transform translate-y-8">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for projects, websites, research papers..."
                    className="w-full pl-10 pr-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button 
                className="ml-4"
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-gray-50 py-16 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/marketplace/project" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Projects</h3>
                <p className="text-gray-600">
                  Ready-to-use software projects and applications
                </p>
              </div>
            </Link>
            
            <Link to="/marketplace/portfolio" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <LayoutIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Portfolios</h3>
                <p className="text-gray-600">
                  Impressive portfolio templates and examples
                </p>
              </div>
            </Link>
            
            <Link to="/marketplace/website" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <LayoutIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Websites</h3>
                <p className="text-gray-600">
                  Complete website templates and solutions
                </p>
              </div>
            </Link>
            
            <Link to="/marketplace/phd" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">PhD Research</h3>
                <p className="text-gray-600">
                  Academic research papers and materials
                </p>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/custom-projects">
              <Button 
                variant="outline" 
                size="lg"
                leftIcon={<Settings className="w-5 h-5" />}
              >
                Request Custom Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Content</h2>
            <Link 
              to="/marketplace" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <ContentGrid contents={featuredContent} />
        </div>
      </section>
      
      {/* Become a Seller CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sell Your Digital Intellectual Property</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our marketplace and start selling your projects, portfolios, websites, 
              and research papers to a global audience.
            </p>
            <Link to="/register?as=seller">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">1</div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Upload</h3>
              <p className="text-gray-600">
                Create an account and upload your digital intellectual property for review.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">2</div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
              <p className="text-gray-600">
                Our administrators review your content to ensure quality and security.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
              <p className="text-gray-600">
                Once approved, your content is available in our marketplace for buyers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};