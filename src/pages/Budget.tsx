import { useState, useEffect } from 'react';
import { DollarSign, Edit, PieChart, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

interface BudgetCategory {
  category: string;
  limit: number;
  spent: number;
  _id?: string;
}

const Budget = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<BudgetCategory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState<BudgetCategory>({
    category: '',
    limit: 0,
    spent: 0
  });

  const [newCategory, setNewCategory] = useState({
    category: '',
    limit: 0
  });

  const [monthlyBudget, setMonthlyBudget] = useState({
    total: 5000,
    categories: [
      { category: 'Food & Dining', limit: 1200, spent: 0 },
      { category: 'Shopping', limit: 800, spent: 0 },
      { category: 'Transportation', limit: 500, spent: 0 },
      { category: 'Entertainment', limit: 300, spent: 0 },
      { category: 'Healthcare', limit: 400, spent: 0 },
      { category: 'Bills & Utilities', limit: 1000, spent: 0 },
      { category: 'Education', limit: 400, spent: 0 },
      { category: 'Travel', limit: 200, spent: 0 },
      { category: 'Other', limit: 200, spent: 0 }
    ]
  });

  const handleAddCategory = () => {
    setMonthlyBudget(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
    setNewCategory({ category: '', limit: 0 });
    setIsEditing(false);
  };

  const handleUpdateLimit = (index: number, newLimit: number) => {
    const updatedCategories = [...monthlyBudget.categories];
    updatedCategories[index] = { ...updatedCategories[index], limit: newLimit };
    setMonthlyBudget(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

  const handleDeleteCategory = (index: number) => {
    setMonthlyBudget(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  // Add fetch and update logic here

  return (
    <div className="min-h-screen bg-dark-bg text-metal-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold metal-text mb-2">Budget Planning</h1>
            <p className="text-metal-white/70 text-lg">Manage your monthly spending limits</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="gold-gradient text-dark-bg px-6 py-3 rounded-xl font-semibold"
          >
            {isEditing ? 'Save Changes' : 'Edit Budgets'}
          </button>
        </div>

        {/* Budget Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, index) => (
            <div key={index} className="dark-card p-6 rounded-xl border border-gold/20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-metal-white">{budget.category}</h3>
                <div className="flex space-x-2">
                  {isEditing && (
                    <>
                      <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-metal-white/60 mb-1">
                    <span>Spent</span>
                    <span>₹{budget.spent.toFixed(2)} / ₹{budget.limit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 border border-gold/20">
                    <div
                      className="h-2 rounded-full bg-gold"
                      style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <input
                    type="number"
                    className="w-full bg-dark-bg border border-gold/30 rounded-lg px-4 py-2 text-metal-white"
                    value={budget.limit}
                    onChange={(e) => {/* Update logic */}}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
