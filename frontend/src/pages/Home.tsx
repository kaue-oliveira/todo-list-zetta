import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Task } from '../types';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Loader } from 'lucide-react';
import { format } from 'date-fns';

export const Home: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, filter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const url = filter === 'ALL'
        ? 'http://localhost:8080/api/tasks'
        : `http://localhost:8080/api/tasks/status/${filter}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTaskName,
          description: newTaskDescription,
        }),
      });

      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setNewTaskName('');
      setNewTaskDescription('');
      setShowNewTaskForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const toggleTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/toggle`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to toggle task');
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task');
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach-100 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-lilac-600" size={40} />
          <p className="text-black font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const pendingCount = tasks.filter(t => t.status === 'PENDING').length;
  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const filteredTasks = filter === 'ALL' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <Layout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Tasks */}
        <div className="bg-gradient-to-br from-sunny-100 to-sunny-50 rounded-memphis-lg border-4 border-black shadow-memphis p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-black text-black uppercase opacity-70 mb-2">Total Tasks</p>
              <p className="text-4xl font-black text-black">{tasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-sunny-300 rounded-memphis flex items-center justify-center transform -rotate-6">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gradient-to-br from-lilac-100 to-lilac-50 rounded-memphis-lg border-4 border-black shadow-memphis p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-black text-black uppercase opacity-70 mb-2">Pending</p>
              <p className="text-4xl font-black text-black">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-lilac-300 rounded-memphis flex items-center justify-center transform rotate-6">
              <span className="text-xl">⏳</span>
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-br from-mint-100 to-mint-50 rounded-memphis-lg border-4 border-black shadow-memphis p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-black text-black uppercase opacity-70 mb-2">Completed</p>
              <p className="text-4xl font-black text-black">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-mint-300 rounded-memphis flex items-center justify-center transform -rotate-6">
              <span className="text-xl">✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-4 border-red-500 rounded-memphis-lg flex gap-3 shadow-memphis">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <p className="text-red-700 font-bold">{error}</p>
        </div>
      )}

      {/* New Task Form */}
      {showNewTaskForm && (
        <div className="mb-8 bg-white rounded-memphis-lg border-4 border-black shadow-memphis-lg p-6">
          <form onSubmit={createTask} className="space-y-4">
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Task Name</label>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-lilac-500 bg-peach-50"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Description (optional)</label>
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-lilac-500 bg-peach-50 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-lilac-500 to-lilac-600 text-white font-black uppercase rounded-memphis shadow-memphis hover:shadow-memphis-lg transform hover:-rotate-1 transition-all border-2 border-black border-opacity-20"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewTaskForm(false);
                  setNewTaskName('');
                  setNewTaskDescription('');
                }}
                className="flex-1 py-3 bg-gray-200 text-black font-black uppercase rounded-memphis shadow-memphis hover:shadow-memphis-lg transition-all border-2 border-black border-opacity-20"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 font-black uppercase rounded-memphis shadow-memphis border-2 border-black transition-all ${
              filter === f
                ? 'bg-black text-white transform scale-105'
                : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            {f === 'ALL' ? '📋 All' : f === 'PENDING' ? '⏳ Pending' : '✅ Completed'}
          </button>
        ))}

        {!showNewTaskForm && (
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="ml-auto px-6 py-3 bg-gradient-to-r from-sunny-400 to-sunny-500 text-white font-black uppercase rounded-memphis shadow-memphis hover:shadow-memphis-lg transform hover:rotate-1 transition-all border-2 border-black border-opacity-20 flex items-center gap-2"
          >
            <Plus size={20} />
            New Task
          </button>
        )}
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="text-center py-12">
          <Loader className="animate-spin mx-auto mb-4 text-lilac-600" size={40} />
          <p className="text-black font-bold">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-memphis-lg border-4 border-black shadow-memphis">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-2xl font-black text-black mb-2">No tasks yet!</p>
          <p className="text-black opacity-60 font-bold">
            {filter === 'ALL' ? 'Create your first task to get started.' : `No ${filter.toLowerCase()} tasks.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-memphis-lg border-4 border-black shadow-memphis hover:shadow-memphis-lg transition-all transform hover:scale-102 ${
                task.status === 'COMPLETED'
                  ? 'bg-mint-50 border-mint-300'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-1 focus:outline-none"
                >
                  {task.status === 'COMPLETED' ? (
                    <CheckCircle2 className="text-mint-600" size={28} />
                  ) : (
                    <Circle className="text-black opacity-40 hover:opacity-60" size={28} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-black uppercase tracking-tight ${
                      task.status === 'COMPLETED'
                        ? 'text-black opacity-50 line-through'
                        : 'text-black'
                    }`}
                  >
                    {task.name}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-2 text-sm font-bold ${
                        task.status === 'COMPLETED'
                          ? 'text-black opacity-40'
                          : 'text-black opacity-70'
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <p className="mt-3 text-xs font-bold text-black opacity-50">
                    {format(new Date(task.createdAt), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex-shrink-0 p-2 hover:bg-red-100 rounded-memphis-sm transition-colors"
                >
                  <Trash2 className="text-red-600" size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};
