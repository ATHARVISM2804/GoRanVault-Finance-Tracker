import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, Calendar, DollarSign, Tag, FileText, Trash2, Edit, TrendingUp, TrendingDown, Eye, Grid, List } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

interface Transaction {
  _id: string;
  uid: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

const ExpenseTracker = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const expenseCategories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Bills & Utilities',
    'Education',
    'Travel',
    'Other'
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Investments',
    'Business',
    'Rental',
    'Others'
  ];

  // Get categories based on selected type
  const getCategories = (type: string) => {
    return type === 'income' ? incomeCategories : expenseCategories;
  };

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Replace the direct axios call with useEffect
  useEffect(() => {
    if (user?.uid) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<Transaction[]>('http://localhost:5000/api/transactions', {
        params: { uid: user?.uid }
      });
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError('Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalAmount = Number(formData.amount);
      
      if (editingTransaction) {
        await axios.put(`http://localhost:5000/api/transactions/${editingTransaction?._id}`, {
          ...formData,
          amount: finalAmount,
          date: new Date(formData.date).toISOString()
        });
      } else {
        await axios.post('http://localhost:5000/api/transactions', {
          uid: user?.uid,
          ...formData,
          amount: finalAmount,
          date: new Date(formData.date).toISOString()
        });
      }
      
      await fetchTransactions();
      setShowAddForm(false);
      setEditingTransaction(null);
      setFormData({
        amount: '',
        category: '',
        description: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error("Error saving transaction:", err);
      setError('Failed to save transaction');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      if (response.data.message) {
        // Refresh the transactions list
        await fetchTransactions();
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError('Failed to delete transaction');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      amount: Math.abs(transaction.amount).toString(),
      category: transaction.category,
      description: transaction.description,
      type: transaction.type,
      date: new Date(transaction.date).toISOString().split('T')[0],
    });
    setShowAddForm(true);
  };

  const filteredExpenses = expenses.filter(expense => {
    if (filterCategory === 'all') return true;
    return expense.category === filterCategory;
  }).filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    
    switch (dateRange) {
      case 'this-month':
        return expenseDate.getMonth() === now.getMonth() && 
               expenseDate.getFullYear() === now.getFullYear();
      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
        return expenseDate.getMonth() === lastMonth.getMonth() && 
               expenseDate.getFullYear() === lastMonth.getFullYear();
      case 'this-year':
        return expenseDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

  const calculateTotals = () => {
    return filteredExpenses.reduce((acc, expense) => {
      const amount = Math.abs(Number(expense.amount));
      if (expense.type === 'expense') {
        acc.totalExpenses += amount;
      } else {
        acc.totalIncome += amount;
      }
      return acc;
    }, { totalExpenses: 0, totalIncome: 0 });
  };

  const { totalExpenses, totalIncome } = calculateTotals();
  const budgetLeft = 5000 - totalExpenses;

  // Add loading state handling
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-metal-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Add error state handling
  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg text-metal-white flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  // Update the card view to handle delete
  const renderCardView = (expense: Transaction) => (
    <div key={expense._id} className="bg-dark-bg/50 p-6 rounded-xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover-glow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${expense.type === 'income'
          ? 'bg-green-500/20 border-green-500/30'
          : 'bg-red-500/20 border-red-500/30'
          }`}>
          <DollarSign className={`h-7 w-7 ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'
            }`} />
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all">
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={() => handleDelete(expense._id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <h3 className="text-metal-white font-semibold text-lg mb-3">{expense.description}</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-metal-white/60 text-sm">{expense.category}</span>
        <span className={`font-bold text-lg ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'
          }`}>
          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
        </span>
      </div>
      <p className="text-metal-white/60 text-sm">{expense.date}</p>
    </div>
  );

  // Update the table view to handle delete
  const renderTableRow = (expense: Transaction) => (
    <tr key={expense._id} className="hover:bg-gold/5 transition-all duration-300">
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${expense.type === 'income'
            ? 'bg-green-500/20 border-green-500/30'
            : 'bg-red-500/20 border-red-500/30'
            }`}>
            <DollarSign className={`h-6 w-6 ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`} />
          </div>
          <span className="text-metal-white font-semibold text-lg">{expense.description}</span>
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gold/10 text-gold border border-gold/30">
          {expense.category}
        </span>
      </td>
      <td className="px-8 py-6 whitespace-nowrap text-metal-white/70 font-medium">
        {expense.date}
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <span className={`font-bold text-xl ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'
          }`}>
          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleEdit(expense)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all">
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={() => handleDelete(expense._id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-metal-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold metal-text mb-2">Expense Tracker</h1>
            <p className="text-metal-white/70 text-lg">Track and manage your expenses with precision</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="gold-gradient text-dark-bg px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-gold/40 transition-all transform hover:scale-105 flex items-center space-x-3 mt-4 sm:mt-0"
          >
            <Plus className="h-5 w-5" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="dark-card hover-glow p-8 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-metal-white/60 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-red-400 mt-1">₹{totalExpenses.toFixed(2)}</p>
                <p className="text-red-400/70 text-sm mt-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.2% from last month
                </p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/30">
                <DollarSign className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </div>

          <div className="dark-card hover-glow p-8 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-metal-white/60 text-sm font-medium">Budget Left</p>
                <p className="text-3xl font-bold text-gold mt-1">₹{budgetLeft.toFixed(2)}</p>
                <p className="text-gold/70 text-sm mt-2 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  {((budgetLeft / 5000) * 100).toFixed(1)}% remaining
                </p>
              </div>
              <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                <DollarSign className="h-8 w-8 text-gold" />
              </div>
            </div>
          </div>

          <div className="dark-card hover-glow p-8 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-metal-white/60 text-sm font-medium">Total Income</p>
                <p className="text-3xl font-bold text-green-400 mt-1">₹{totalIncome.toFixed(2)}</p>
                <p className="text-green-400/70 text-sm mt-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.8% from last month
                </p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/30">
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="dark-card p-8 rounded-xl border border-gold/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex items-center space-x-3">
              <Filter className="h-6 w-6 text-gold" />
              <span className="text-metal-white font-semibold text-lg">Filters & View</span>
            </div>

            <div className="flex flex-wrap gap-4 items-center flex-1">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-dark-bg border border-gold/30 rounded-xl px-4 py-3 text-metal-white focus:ring-2 focus:ring-gold focus:border-transparent min-w-[180px]"
              >
                <option value="all">All Categories</option>
                <optgroup label="Income">
                  {incomeCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </optgroup>
                <optgroup label="Expenses">
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </optgroup>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-dark-bg border border-gold/30 rounded-xl px-4 py-3 text-metal-white focus:ring-2 focus:ring-gold focus:border-transparent min-w-[150px]"
              >
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>

              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'table'
                    ? 'bg-gold text-dark-bg shadow-lg shadow-gold/30'
                    : 'bg-dark-bg text-metal-white/70 hover:bg-gold/10 hover:text-gold border border-gold/30'
                    }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'cards'
                    ? 'bg-gold text-dark-bg shadow-lg shadow-gold/30'
                    : 'bg-dark-bg text-metal-white/70 hover:bg-gold/10 hover:text-gold border border-gold/30'
                    }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Expenses List */}
        <div className="dark-card rounded-xl border border-gold/20 overflow-hidden">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-bg/50 border-b border-gold/20">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gold uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {filteredExpenses.map((expense) => renderTableRow(expense))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpenses.map((expense) => renderCardView(expense))}
            </div>
          )}
        </div>

        {/* Enhanced Add Expense Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="dark-card p-10 rounded-2xl border border-gold/30 w-full max-w-lg shadow-2xl shadow-gold/20">
              <h2 className="text-3xl font-bold metal-text mb-8">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      {getCategories(formData.type).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

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
                      <option value="">Select type</option>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
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
                    {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTransaction(null);
                      setFormData({
                        amount: '',
                        category: '',
                        description: '',
                        type: 'expense',
                        date: new Date().toISOString().split('T')[0],
                      });
                    }}
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

export default ExpenseTracker;