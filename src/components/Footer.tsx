import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="gold-gradient p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-dark-bg" />
              </div>
              <span className="text-xl font-bold metal-text">
                FinanceFlow
              </span>
            </Link>
            <p className="text-metal-white/70 text-sm">
              Take control of your money with smart finance tracking and AI-powered tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-metal-white/60 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-metal-white/60 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-metal-white/60 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-metal-white/60 hover:text-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-metal-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-metal-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-metal-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-metal-white/70 hover:text-gold transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 mt-8 text-center">
          <p className="text-metal-white/60 text-sm">
            © 2025 FinanceFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;