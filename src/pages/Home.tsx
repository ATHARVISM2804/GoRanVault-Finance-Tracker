import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Smartphone, 
  Brain, 
  Users, 
  CreditCard,
  Globe,
  Bell,
  Cloud,
  Palette,
  Star,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Auto Categorization",
      description: "Automatically sorts your expenses into categories using AI"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Smart Invoice Reader",
      description: "Upload or scan invoices and extract data intelligently"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "WhatsApp Integration",
      description: "Track expenses via WhatsApp chat seamlessly"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Chatbot",
      description: "Get personalized financial advice and planning assistance"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Shared Wallets",
      description: "Manage budgets with family, roommates, or teams"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Bank Sync",
      description: "Securely connect and sync your bank accounts"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Add Expenses",
      description: "Upload receipts, connect accounts, or manually add transactions"
    },
    {
      number: "2",
      title: "Track Automatically",
      description: "AI categorizes and analyzes your spending patterns"
    },
    {
      number: "3",
      title: "Optimize & Save",
      description: "Get insights and recommendations to improve your finances"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "FinanceFlow has completely transformed how I manage my finances. The AI categorization is incredibly accurate!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content: "The WhatsApp integration is a game-changer. I can track expenses on the go without opening any apps.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Small Business Owner",
      content: "Shared wallets make it so easy to manage business expenses with my team. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="bg-hero-pattern bg-cover bg-center bg-no-repeat py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg"></div>
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 metal-text leading-tight">
              Take Control of Your Money with Smart Finance Tracking
            </h1>
            <p className="text-xl text-metal-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Track, plan, and optimize your expenses with AI-powered tools designed for modern financial management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="gold-gradient text-dark-bg px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-gold/40 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-gold/30 text-metal-white px-8 py-4 rounded-lg text-lg font-semibold hover:border-gold hover:bg-gold/10 transition-all backdrop-blur-sm"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 metal-text">
              Powerful Features for Smart Finance Management
            </h2>
            <p className="text-metal-white/80 text-lg max-w-2xl mx-auto">
              Everything you need to take control of your finances in one intelligent platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="dark-card hover-glow p-8 rounded-xl transition-all duration-300"
              >
                <div className="text-gold mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-metal-white">{feature.title}</h3>
                <p className="text-metal-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 metal-text">
              How It Works
            </h2>
            <p className="text-metal-white/80 text-lg max-w-2xl mx-auto">
              Get started with FinanceFlow in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/30">
                  <span className="text-2xl font-bold text-dark-bg">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-metal-white">{step.title}</h3>
                <p className="text-metal-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 metal-text">
              What Our Users Say
            </h2>
            <p className="text-metal-white/80 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied users who've transformed their financial management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="dark-card p-8 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-metal-white/80 mb-6">"{testimonial.content}"</p>
                <div>
                  <h4 className="text-metal-white font-semibold">{testimonial.name}</h4>
                  <p className="text-metal-brown text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 metal-text">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-metal-white/80 text-lg mb-8">
              Join thousands of users who are already managing their money smarter with FinanceFlow
            </p>
            <Link
              to="/signup"
              className="gold-gradient text-dark-bg px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-gold/40 transition-all transform hover:scale-105 inline-flex items-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;