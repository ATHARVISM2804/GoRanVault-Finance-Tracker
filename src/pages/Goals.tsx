import { useState } from 'react';
import { Target, Plus, Trash2, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface FinancialGoal {
  id?: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const Goals = () => {
  const { user } = useAuth();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [newGoal, setNewGoal] = useState<FinancialGoal>({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: new Date().toISOString().split('T')[0],
    category: 'Savings'
  });

  const handleAddGoal = async () => {
    try {
      setGoals(prev => [...prev, { ...newGoal, id: Date.now().toString() }]);
      setShowAddGoal(false);
      setNewGoal({
        title: '',
        targetAmount: 0,
        currentAmount: 0,
        deadline: new Date().toISOString().split('T')[0],
        category: 'Savings'
      });
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const goalCategories = [
    'Savings',
    'Investment',
    'Emergency Fund',
    'Vacation',
    'Home',
    'Vehicle',
    'Education',
    'Wedding',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-metal-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold metal-text mb-2">Financial Goals</h1>
            <p className="text-metal-white/70 text-lg">Track your saving targets</p>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="gold-gradient text-dark-bg px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Goal</span>
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="dark-card p-6 rounded-xl border border-gold/20">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-metal-white">{goal.title}</h3>
                <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg" onClick={() => handleDeleteGoal(goal.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-metal-white/60 mb-1">
                    <span>Progress</span>
                    <span>₹{goal.currentAmount.toFixed(2)} / ₹{goal.targetAmount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 border border-gold/20">
                    <div
                      className="h-2 rounded-full bg-gold"
                      style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-metal-white/60">Deadline</span>
                  <span className="text-metal-white">{new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="dark-card p-10 rounded-2xl border border-gold/30 w-full max-w-lg">
              <h2 className="text-3xl font-bold metal-text mb-8">Add New Goal</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-dark-bg border border-gold/30 rounded-xl px-4 py-3 text-metal-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">Target Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gold" />
                    <input
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: Number(e.target.value) }))}
                      className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-gold/30 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-dark-bg border border-gold/30 rounded-xl px-4 py-3 text-metal-white"
                    required
                  >
                    {goalCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-metal-white mb-3">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full bg-dark-bg border border-gold/30 rounded-xl px-4 py-3 text-metal-white"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 gold-gradient text-dark-bg py-4 rounded-xl font-semibold"
                  >
                    Add Goal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 bg-dark-bg border border-gold/30 text-metal-white py-4 rounded-xl"
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

export default Goals;
