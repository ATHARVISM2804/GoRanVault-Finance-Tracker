import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../auth/AuthContext';
import { doSignOut } from '../auth/auth';
import axios from 'axios';
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
  Filter,
  Tag,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [netSavings, setNetSavings] = useState(0);
  const [previousMonthData, setPreviousMonthData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    netSavings: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'expense',
    date: ''
  });

  const categories = ['Food & Dining', 'Shopping', 'Transportation', 'Entertainment', 'Healthcare', 'Income', 'Other'];

  async function getTransactions() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/transactions", {
        params: { uid: user?.uid },
      });
  
      console.log("Transactions:", data);
      setTransactions(data);
  
      // Get current month/year in UTC to avoid timezone issues
      const now = new Date();
      const currentMonth = now.getUTCMonth();
      const currentYear = now.getUTCFullYear();
  
      // Initialize calculations
      let totalBalance = 0;
      let totalIncome = 0;
      let totalExpenses = 0;
      let monthlyIncome = 0;
      let monthlyExpenses = 0;
      let previousMonthIncome = 0;
      let previousMonthExpenses = 0;
  
      data.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const amount = Number(transaction.amount);
        
        // Update running totals
        totalBalance += amount;
        
        if (amount > 0) {
          totalIncome += amount;
        } else {
          totalExpenses += Math.abs(amount);
        }

        // Check if transaction is from current month
        const isCurrentMonth = 
          transactionDate.getUTCMonth() === currentMonth && 
          transactionDate.getUTCFullYear() === currentYear;
  
        // Check if transaction is from previous month
        const isPreviousMonth = 
          (transactionDate.getUTCMonth() === (currentMonth === 0 ? 11 : currentMonth - 1)) &&
          transactionDate.getUTCFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear);
  
        if (amount > 0) {
          if (isCurrentMonth) monthlyIncome += amount;
          if (isPreviousMonth) previousMonthIncome += amount;
        } else {
          const absoluteAmount = Math.abs(amount);
          if (isCurrentMonth) monthlyExpenses += absoluteAmount;
          if (isPreviousMonth) previousMonthExpenses += absoluteAmount;
        }
      });
  
      // Calculate metrics
      const netSavings = monthlyIncome - monthlyExpenses;
      const previousMonthNetSavings = previousMonthIncome - previousMonthExpenses;
  
      // Update previous month data
      setPreviousMonthData({
        totalBalance,
        monthlyIncome: previousMonthIncome,
        monthlyExpenses: previousMonthExpenses,
        netSavings: previousMonthNetSavings
      });
  
      // Update current values
      setTotalBalance(totalBalance);
      setTotalIncome(totalIncome);
      setTotalExpenses(totalExpenses);
      setMonthlyIncome(monthlyIncome);
      setMonthlyExpenses(monthlyExpenses);
      setNetSavings(netSavings);
  
      console.log("Financial Calculations:", {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        netSavings,
        previousMonthIncome,
        previousMonthExpenses,
        previousMonthNetSavings
      });
  
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }
  
  // Improved percentage change calculator
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current === 0 ? '0' : '∞';
    const change = ((current - previous) / Math.abs(previous)) * 100;
    return change.toFixed(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert amount to negative if it's an expense
      const amount = formData.type === 'expense' 
        ? -Math.abs(Number(formData.amount))
        : Math.abs(Number(formData.amount));

      // Add transaction to the database
      await axios.post("http://localhost:5000/api/transactions", {
        ...formData,
        amount,
        uid: user?.uid
      });

      // Reset form and close
      setFormData({
        amount: '',
        description: '',
        category: '',
        type: 'expense',
        date: ''
      });
      setShowForm(false);

      // Refresh transactions
      await getTransactions();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getTransactions();
    }
  }, [user]);

  const expenseData = [
    { name: 'Food & Dining', value: 50, color: '#d4af37' },
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

  const budgetCategories = [
    { name: 'Food & Dining', spent: 850, budget: 1200, color: '#d4af37' },
    { name: 'Shopping', spent: 450, budget: 800, color: '#f4e4a6' },
    { name: 'Transportation', spent: 320, budget: 500, color: '#8b7355' },
    { name: 'Entertainment', spent: 180, budget: 300, color: '#b8941f' },
  ];

  const COLORS = ['#d4af37', '#f4e4a6', '#8b7355', '#b8941f', '#e8e8e8'];

  // Function to render percentage change with correct arrow
  const renderPercentageChange = (current, previous) => {
    const percentage = calculatePercentageChange(current, previous);
    const isPositive = current >= previous;
    
    return (
      <span className={`${isPositive ? 'text-green-400' : 'text-red-400'} text-sm flex items-center`}>
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        {percentage}%
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg text-metal-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-dark-card/80 backdrop-blur-sm min-h-screen border-r border-gold/20">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-8 p-4 bg-gold/5 rounded-xl border border-gold/20">
              <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
                <User className="h-7 w-7 text-dark-bg" />
              </div>
              <div>
                <h3 className="font-semibold text-metal-white text-lg">{user?.displayName || user?.email}</h3>
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
            <div className="mt-8 pt-8 border-t border-gold/20" onClick={() => doSignOut()}>
              <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-metal-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 w-full group">
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card/20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold metal-text mb-2">Welcome back, {user?.displayName || user?.email}!</h1>
                <p className="text-metal-white/70 text-lg">Here's your financial overview</p>
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Balance */}
            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Total Balance</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">${totalBalance.toFixed(2)}</p>
                  {renderPercentageChange(totalBalance, previousMonthData.totalBalance)}
                </div>
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <DollarSign className="h-8 w-8 text-gold" />
                </div>
              </div>
            </div>

            {/* Monthly Income */}
            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Monthly Income</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">${monthlyIncome.toFixed(2)}</p>
                  {renderPercentageChange(monthlyIncome, previousMonthData.monthlyIncome)}
                </div>
                <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/30">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>

            {/* Monthly Expenses */}
            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Monthly Expenses</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">${monthlyExpenses.toFixed(2)}</p>
                  {renderPercentageChange(monthlyExpenses, previousMonthData.monthlyExpenses)}
                </div>
                <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/30">
                  <CreditCard className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>

            {/* Net Savings */}
            <div className="dark-card hover-glow p-6 rounded-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-metal-white/60 text-sm font-medium">Net Savings</p>
                  <p className="text-3xl font-bold text-metal-white mt-1">${netSavings.toFixed(2)}</p>
                  {renderPercentageChange(netSavings, previousMonthData.netSavings)}
                </div>
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <PiggyBank className="h-8 w-8 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
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
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction._id || transaction.id} className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl border border-gold/10 hover:border-gold/30 transition-all">
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
                        <p className="text-metal-white/60 text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-metal-white/60 text-center py-8">No transactions found</p>
                )}
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

          {/* Quick Actions */}
          <div className="mt-8 dark-card p-8 rounded-xl border border-gold/20">
            <h3 className="text-2xl font-semibold mb-6 text-metal-white">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-4 p-6 bg-gold/10 rounded-xl border border-gold/30 hover:bg-gold/20 transition-all duration-300 group"
              >
                <div className="bg-gold/20 p-3 rounded-xl">
                  <Plus className="h-6 w-6 text-gold" />
                </div>
                <div className="text-left">
                  <span className="text-gold font-semibold block">Add Transaction</span>
                  <span className="text-metal-white/60 text-sm">Record new income or expense</span>
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

        {/* Add Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="dark-card p-10 rounded-2xl border border-gold/30 w-full max-w-lg shadow-2xl shadow-gold/20">
              <h2 className="text-3xl font-bold metal-text mb-8">Add New Transaction</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">
                    Type
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gold" />
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-dark-bg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white text-lg"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gold" />
                    <input
                      type="number"
                      name="amount"
                      step="0.01"
                      min="0"
                      required
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-dark-bg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown text-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gold" />
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-dark-bg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white text-lg"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">
                    Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 h-6 w-6 text-gold" />
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-dark-bg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white placeholder-metal-brown text-lg"
                      placeholder="Enter description..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gold" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-dark-bg border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-metal-white text-lg"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 gold-gradient text-dark-bg py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all text-lg"
                  >
                    Add Transaction
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-dark-bg border border-gold/30 text-metal-white py-4 rounded-xl font-semibold hover:bg-gold/10 transition-all text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;