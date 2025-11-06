import { useState, useEffect } from "react";
import { PlusCircle, Trash2, TrendingDown, Calendar, Tag, DollarSign, BarChart3, Wallet } from "lucide-react";

// Mock API functions for demo
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
;
function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/expenses`);
      setExpenses(res.data);
    } catch (err) {
      console.error("❌ Error fetching expenses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/expenses/summary`);
      setSummary(res.data);
    } catch (err) {
      console.error("❌ Error fetching summary:", err.message);
    }
  };

    const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/expenses`, form);
      setForm({ title: "", amount: "", category: "", date: "" });
      fetchExpenses(); // refresh list
      fetchSummary(); // refresh summary
    } catch (err) {
      console.error("❌ Error adding expense:", err.message);
    }
  };

 const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`${API_URL}/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("❌ Error deleting expense:", err.message);
    }
  };

  const totalExpenses = summary.reduce((sum, item) => sum + item.total, 0);

  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍽️",
      Transport: "🚗",
      Shopping: "🛍️",
      Bills: "📄",
      Entertainment: "🎬",
      Health: "🏥",
      Education: "📚"
    };
    return icons[category] || "💰";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: "bg-orange-100 text-orange-800 border-orange-200",
      Transport: "bg-blue-100 text-blue-800 border-blue-200",
      Shopping: "bg-purple-100 text-purple-800 border-purple-200",
      Bills: "bg-red-100 text-red-800 border-red-200",
      Entertainment: "bg-pink-100 text-pink-800 border-pink-200",
      Health: "bg-green-100 text-green-800 border-green-200",
      Education: "bg-indigo-100 text-indigo-800 border-indigo-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-center text-lg">Manage your finances with style and ease</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Expenses</p>
                <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-emerald-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold">{summary.length}</p>
              </div>
              <Tag className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold">₹{Math.floor(totalExpenses * 0.3).toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg/Day</p>
                <p className="text-3xl font-bold">₹{Math.floor(totalExpenses / 30).toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-100" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PlusCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
              </div>
              
              <form onSubmit={addExpense} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter expense title..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select category...</option>
                    <option value="Food">🍽️ Food</option>
                    <option value="Transport">🚗 Transport</option>
                    <option value="Shopping">🛍️ Shopping</option>
                    <option value="Bills">📄 Bills</option>
                    <option value="Entertainment">🎬 Entertainment</option>
                    <option value="Health">🏥 Health</option>
                    <option value="Education">📚 Education</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <PlusCircle className="w-5 h-5" />
                    <span>{loading ? 'Adding...' : 'Add Expense'}</span>
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Expenses List & Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expense List */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
                <p className="text-gray-600 mt-1">Track and manage your spending</p>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses yet</h3>
                    <p className="text-gray-500">Start by adding your first expense!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {expenses.map((exp, index) => (
                      <div key={exp._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl">
                              {getCategoryIcon(exp.category)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{exp.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                                  {exp.category}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(exp.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">₹{exp.amount.toLocaleString()}</div>
                            </div>
                            <button
                              onClick={() => deleteExpense(exp._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                              title="Delete expense"
                            >
                              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-8 py-6 border-b border-emerald-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-200 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-800">Expense Summary</h2>
                    <p className="text-emerald-600 mt-1">Breakdown by category</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                {summary.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No data available yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {summary.map((item, index) => {
                      const percentage = totalExpenses > 0 ? (item.total / totalExpenses) * 100 : 0;
                      return (
                        <div key={item._id} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${getCategoryColor(item._id).includes('orange') ? 'bg-orange-500' : 
                                getCategoryColor(item._id).includes('blue') ? 'bg-blue-500' :
                                getCategoryColor(item._id).includes('purple') ? 'bg-purple-500' :
                                getCategoryColor(item._id).includes('red') ? 'bg-red-500' :
                                getCategoryColor(item._id).includes('pink') ? 'bg-pink-500' :
                                getCategoryColor(item._id).includes('green') ? 'bg-green-500' :
                                getCategoryColor(item._id).includes('indigo') ? 'bg-indigo-500' :
                                'bg-gray-500'}`}></div>
                              <span className="font-semibold text-gray-800 text-lg">{item._id}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-xl text-gray-800">₹{item.total.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;