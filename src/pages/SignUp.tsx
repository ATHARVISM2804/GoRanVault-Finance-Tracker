import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, DollarSign, User } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { auth } from '../auth/firebase.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
  
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token); // optional
  
      console.log("Signup successful!");

      // await axios.post(
      //   "/api/users",
      //   { name, email },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json"
      //     }
      //   }
      // );
      navigate("/dashboard"); // redirect after signup
    } catch (error) {
      console.error("Signup failed:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(errorMessage);
    }

    
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = result.user.getIdToken();
        localStorage.setItem('token', token);
        console.log("Login successful!");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Invalid email or password.");
      }); 
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
          <h2 className="text-3xl font-bold text-metal-white mb-2">Create your account</h2>
          <p className="text-metal-white/70">Start your financial journey today</p>
        </div>

        <div className="dark-card p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-metal-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-metal-brown" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-metal-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-metal-brown" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-metal-brown hover:text-metal-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-metal-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-metal-brown" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-metal-brown hover:text-metal-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-gold focus:ring-gold bg-dark-bg border-gold/30 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-metal-white">
                I agree to the{' '}
                <a href="#" className="text-gold hover:text-gold-light">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-gold hover:text-gold-light">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full gold-gradient text-dark-bg py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-card text-metal-brown">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gold/30 bg-dark-bg text-sm font-medium text-metal-white hover:bg-dark-card transition-colors"
              onClick={handleGoogleSignIn}>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              {/* <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gold/30 bg-dark-bg text-sm font-medium text-metal-white hover:bg-dark-card transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                <span className="ml-2">Twitter</span>
              </button> */}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-metal-brown">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:text-gold-light font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;