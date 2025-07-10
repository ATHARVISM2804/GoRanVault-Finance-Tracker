import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Receipt, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Plus,
  Upload,
  Calendar,
  Wallet,
  PiggyBank,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for charts
  const expenseData = [
    { name: 'Food & Dining', value: 35, color: '#d4af37' },
    { name: 'Shopping', value: 25, color: '#f4e4a6' },
    { name: 'Transportation', value: 20, color: '#8b7355' },
    { name: 'Entertainment', value: 12, color: '#b8941f' },
    { name: 'Healthcare', value: 8, color: '#e8e8e8' },
  ];

  const monthlyTrends = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5200, expenses: 3800 },
    { month: 'Mar', income: 4800, expenses: 3200 },
    { month: 'Apr', income: 5500, expenses: 4100 },
    { month: 'May', income: 5300, expenses: 3900 },
    { month: 'Jun', income: 5700, expenses: 4200 },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.50, category: 'Food & Dining', date: '2025-01-15' },
    { id: 2, description: 'Salary Deposit', amount: 5500.00, category: 'Income', date: '2025-01-15' },
    { id: 3, description: 'Coffee Shop', amount: -12.80, category: 'Food & Dining', date: '2025-01-14' },
    { id: 4, description: 'Gas Station', amount: -45.00, category: 'Transportation', date: '2025-01-14' },
    { id: 5, description: 'Online Shopping', amount: -156.99, category: 'Shopping', date: '2025-01-13' },
  ];

  const budgetCategories = [
    { name: 'Food & Dining', spent: 850, budget: 1200, color: '#d4af37' },
    { name: 'Shopping', spent: 450, budget: 800, color: '#f4e4a6' },
    { name: 'Transportation', spent: 320, budget: 500, color: '#8b7355' },
    { name: 'Entertainment', spent: 180, budget: 300, color: '#b8941f' },
  ];

  const COLORS = ['#d4af37', '#f4e4a6', '#8b7355', '#b8941f', '#e8e8e8'];

  return (
    <div className="min-h-screen bg-dark-bg text-metal-white">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-72 bg-dark-card/80 backdrop-blur-sm min-h-screen border-r border-gold/20">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-8 p-4 bg-gold/5 rounded-xl border border-gold/20">
              <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
                <User className="h-7 w-7 text-dark-bg" />
              </div>
              <div>
                <h3 className="font-semibold text-metal-white text-lg">John Doe</h3>
                <p className="text-sm text-gold">Premium User</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs text-metal-white/60">Online</span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gold/10 text-gold border border-gold/30 shadow-lg shadow-gold/20">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-gold/5 hover:text-gold transition-all duration-300 group">
                <Receipt className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Transactions</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-gold/5 hover:text-gold transition-all duration-300 group">
                <Wallet className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Budgets</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-gold/5 hover:text-gold transition-all duration-300 group">
                <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Goals</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-gold/5 hover:text-gold transition-all duration-300 group">
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Alerts</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-gold/5 hover:text-gold transition-all duration-300 group">
                <Settings className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Settings</span>
              </a>
            </nav>
            
            {/* Logout Section */}
            <div className="mt-8 pt-8 border-t border-gold/20">
              <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 w-full group">
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card/20">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold metal-text mb-2">Welcome back, John!</h1>
                <p className="text-metal-white/70 text-lg">Here's your financial overview for January 2025</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-3 bg-gold/10 rounded-xl border border-gold/30 hover:bg-gold/20 transition-all">
                  <Filter className="h-5 w-5 text-gold" />
                </button>
                <button className="p-3 bg-gold/10 rounded-xl border border-gold/30 hover:bg-gold/20 transition-all">
                  <Eye className="h-5 w-5 text-gold" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Total Balance</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">$12,450</p>
                  <p className="text-gold text-sm flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <DollarSign className="h-8 w-8 text-gold" />
                </div>
              </div>
            </div>

            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Monthly Income</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">$5,700</p>
                  <p className="text-green-400 text-sm flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +8.2%
                  </p>
                </div>
                <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/30">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>

            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Monthly Expenses</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">$4,200</p>
                  <p className="text-red-400 text-sm flex items-center mt-2">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    +5.1%
                  </p>
                </div>
                <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/30">
                  <CreditCard className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>

            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Net Savings</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">$1,500</p>
                  <p className="text-gold text-sm flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +15.8%
                  </p>
                </div>
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <PiggyBank className="h-8 w-8 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Expense Breakdown */}
            <div className="dark-card p-8 rounded-xl border border-gold/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-metal-white">Expense Breakdown</h3>
                <button className="text-gold hover:text-gold-light text-sm font-medium">View Details</button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #d4af37',
                        borderRadius: '12px',
                        color: '#e8e8e8'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="dark-card p-8 rounded-xl border border-gold/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-metal-white">Monthly Trends</h3>
                <button className="text-gold hover:text-gold-light text-sm font-medium">View Report</button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="month" stroke="#8b7355" />
                    <YAxis stroke="#8b7355" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #d4af37',
                        borderRadius: '12px',
                        color: '#e8e8e8'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#d4af37" 
                      strokeWidth={3}
                      name="Income"
                      dot={{ fill: '#d4af37', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Expenses"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions & Budget Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 dark-card p-8 rounded-xl border border-gold/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-metal-white">Recent Transactions</h3>
                <button className="text-gold hover:text-gold-light text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl border border-gold/10 hover:border-gold/30 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                      }`}>
                        {transaction.amount > 0 ? (
                          <TrendingUp className="h-6 w-6 text-green-400" />
                        ) : (
                          <CreditCard className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-metal-white font-semibold">{transaction.description}</p>
                        <p className="text-metal-white/60 text-sm">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-metal-white/60 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Status */}
            <div className="dark-card p-8 rounded-xl border border-gold/20">
              <h3 className="text-2xl font-semibold mb-6 text-metal-white">Budget Status</h3>
              <div className="space-y-6">
                {budgetCategories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-metal-white font-medium">{category.name}</span>
                      <span className="text-metal-white/60 text-sm">${category.spent}/${category.budget}</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-3 border border-gold/20">
                      <div 
                        className="h-3 rounded-full transition-all duration-500 shadow-lg"
                        style={{ 
                          width: `${(category.spent / category.budget) * 100}%`,
                          backgroundColor: category.color,
                          boxShadow: `0 0 10px ${category.color}40`
                        }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-metal-white/60">
                        {((category.spent / category.budget) * 100).toFixed(1)}% used
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="mt-8 dark-card p-8 rounded-xl border border-gold/20">
            <h3 className="text-2xl font-semibold mb-6 text-metal-white">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="flex items-center space-x-4 p-6 bg-gold/10 rounded-xl border border-gold/30 hover:bg-gold/20 transition-all duration-300 group">
                <div className="bg-gold/20 p-3 rounded-xl">
                  <Plus className="h-6 w-6 text-gold" />
                </div>
                <div className="text-left">
                  <span className="text-gold font-semibold block">Add Expense</span>
                  <span className="text-metal-white/60 text-sm">Record new transaction</span>
                </div>
              </button>
              <button className="flex items-center space-x-4 p-6 bg-blue-500/10 rounded-xl border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300 group">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Upload className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <span className="text-blue-400 font-semibold block">Upload Invoice</span>
                  <span className="text-metal-white/60 text-sm">Scan receipt or bill</span>
                </div>
              </button>
              <button className="flex items-center space-x-4 p-6 bg-purple-500/10 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300 group">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <Bell className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <span className="text-purple-400 font-semibold block">Set Reminder</span>
                  <span className="text-metal-white/60 text-sm">Create alert or goal</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;