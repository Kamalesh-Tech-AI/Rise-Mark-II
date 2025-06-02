import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Upload, Briefcase, Menu, X, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, activeRole, switchRole, logout } = useAuthStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">IntellectMarket</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/marketplace" 
              className={`text-sm font-medium ${isActive('/marketplace') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Marketplace
            </Link>
            <Link 
              to="/custom-projects" 
              className={`text-sm font-medium ${isActive('/custom-projects') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Custom Projects
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Dashboard
              </Link>
            )}
          </nav>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {activeRole === 'buyer' && (
                  <Link to="/cart\" className="text-gray-600 hover:text-blue-600 relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  </Link>
                )}
                
                {(activeRole === 'seller' || activeRole === 'developer') && (
                  <Link to="/upload" className="text-gray-600 hover:text-blue-600">
                    <Upload className="h-5 w-5" />
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-gray-100 rounded-full p-2">
                    <User className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    {user?.roles && user.roles.length > 1 && (
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Switch Role</p>
                        <div className="flex flex-wrap gap-2">
                          {user.roles.map(role => (
                            <button
                              key={role}
                              onClick={() => switchRole(role)}
                              className={`text-xs px-2 py-1 rounded-full ${
                                activeRole === role 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden py-4 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/marketplace" 
              className={`block py-2 ${isActive('/marketplace') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/custom-projects" 
              className={`block py-2 ${isActive('/custom-projects') ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Custom Projects
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`block py-2 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            <div className="pt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <div className="py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  {user?.roles && user.roles.length > 1 && (
                    <div className="py-2">
                      <p className="text-xs text-gray-500 mb-1">Switch Role</p>
                      <div className="flex flex-wrap gap-2">
                        {user.roles.map(role => (
                          <button
                            key={role}
                            onClick={() => switchRole(role)}
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeRole === role 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Link>
                  
                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center py-2 text-red-600 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" fullWidth>Log In</Button>
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="primary" fullWidth>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};