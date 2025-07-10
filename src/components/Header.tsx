import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, DollarSign } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/expense-tracker', label: 'Tracker' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass sticky top-0 z-50 border-b border-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="gold-gradient p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-dark-bg" />
            </div>
            <span className="text-xl font-bold metal-text">
              FinanceFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isActive(item.path) ? 'text-gold' : 'text-metal-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-metal-white hover:text-gold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="gold-gradient text-dark-bg px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-gold/30 transition-all transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-metal-white" /> : <Menu className="h-6 w-6 text-metal-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold/20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    isActive(item.path) ? 'text-gold' : 'text-metal-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gold/20">
                <Link
                  to="/login"
                  className="text-sm font-medium text-metal-white hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="gold-gradient text-dark-bg px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-gold/30 transition-all inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;