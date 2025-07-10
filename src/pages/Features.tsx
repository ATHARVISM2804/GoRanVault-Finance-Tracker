import React from 'react';
import { 
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
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Auto Categorization",
      description: "Automatically sorts your expenses into categories using advanced AI algorithms. No more manual categorization - our system learns your spending patterns and accurately classifies transactions in real-time.",
      benefits: ["Machine learning accuracy", "Saves time", "Learns your habits", "Real-time processing"]
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Smart Invoice Reader",
      description: "Upload or scan invoices and extract data intelligently using OCR technology. Our AI can read receipts, bills, and invoices to automatically add transactions to your expense tracker.",
      benefits: ["OCR technology", "Multiple formats", "Automatic data extraction", "Receipt scanning"]
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "WhatsApp Agent Integration",
      description: "Track expenses or check your balance directly through WhatsApp. Simply send a message to our bot with your expense details or ask for your current financial status.",
      benefits: ["Instant messaging", "Voice messages", "Photo uploads", "Quick balance checks"]
    },
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI Chatbot",
      description: "Get personalized financial advice and assistance from our AI-powered chatbot. Ask questions about your spending, get budget recommendations, and receive tailored financial planning tips.",
      benefits: ["24/7 availability", "Personalized advice", "Budget optimization", "Financial planning"]
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Shared Wallets",
      description: "Manage budgets collaboratively with family, roommates, or team members. Create shared expense categories, track group spending, and split bills automatically.",
      benefits: ["Group budgeting", "Bill splitting", "Real-time sync", "Permission controls"]
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Bank Account Sync",
      description: "Securely connect your bank accounts and credit cards to automatically import transactions. Bank-grade security ensures your data is always protected.",
      benefits: ["Automatic imports", "Bank-grade security", "Multi-account support", "Real-time updates"]
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Multi-Currency Support",
      description: "Track expenses across different currencies with automatic conversion rates. Perfect for international travelers and businesses operating globally.",
      benefits: ["Real-time exchange rates", "Global currency support", "Travel-friendly", "Business ready"]
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: "Custom Alerts & Reminders",
      description: "Get notified about bills, budget limits, unusual spending, or savings goals. Set up custom alerts that help you stay on track with your financial objectives.",
      benefits: ["Bill reminders", "Budget alerts", "Spending notifications", "Goal tracking"]
    },
    {
      icon: <Cloud className="h-10 w-10" />,
      title: "Cloud Backup & Sync",
      description: "Your financial data is safely synced across all devices and backed up in the cloud. Access your information anywhere, anytime with complete peace of mind.",
      benefits: ["Cross-device sync", "Automatic backup", "Data security", "Universal access"]
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: "Customization",
      description: "Personalize your experience with custom themes, category names, and budget groups. Make FinanceFlow work exactly the way you want it to.",
      benefits: ["Custom themes", "Personalized categories", "Flexible budgets", "User preferences"]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 metal-text">
            Powerful Features for Smart Finance Management
          </h1>
          <p className="text-xl text-metal-white/80 max-w-3xl mx-auto">
            Discover all the tools and features that make FinanceFlow the ultimate personal finance management platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="dark-card hover-glow p-8 rounded-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-gold flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-metal-white">{feature.title}</h3>
                  <p className="text-metal-white/70 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gold" />
                        <span className="text-sm text-metal-white/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gold/5 p-12 rounded-2xl border border-gold/20">
          <h2 className="text-3xl font-bold mb-4 metal-text">
            Ready to Experience All These Features?
          </h2>
          <p className="text-metal-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter with FinanceFlow's comprehensive feature set
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="gold-gradient text-dark-bg px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-gold/40 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/login"
              className="border-2 border-gold/30 text-metal-white px-8 py-4 rounded-lg text-lg font-semibold hover:border-gold hover:bg-gold/10 transition-all"
            >
              Login to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;