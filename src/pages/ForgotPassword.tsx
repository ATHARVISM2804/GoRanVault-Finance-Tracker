import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, DollarSign } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Reset password requested for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="gold-gradient p-3 rounded-xl">
              <DollarSign className="h-8 w-8 text-dark-bg" />
            </div>
            <span className="text-2xl font-bold metal-text">
              FinanceFlow
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-metal-white mb-2">
            {isSubmitted ? 'Check your email' : 'Reset your password'}
          </h2>
          <p className="text-metal-white/70">
            {isSubmitted
              ? 'We have sent a password reset link to your email'
              : 'Enter your email address and we will send you a link to reset your password'}
          </p>
        </div>

        <div className="dark-card p-8 rounded-xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-metal-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-metal-brown" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full gold-gradient text-dark-bg py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all transform hover:scale-105"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6">
                <Mail className="h-12 w-12 text-gold mx-auto mb-4" />
                <p className="text-metal-white/80">
                  If an account with <span className="text-gold font-medium">{email}</span> exists, 
                  you will receive a password reset link shortly.
                </p>
              </div>
              
              <div className="text-sm text-metal-white/60">
                <p>Didn't receive the email? Check your spam folder or</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-gold hover:text-gold-light font-medium"
                >
                  try again
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-metal-white/60 hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;