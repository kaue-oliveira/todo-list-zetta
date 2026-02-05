import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, AlertCircle, Loader, CheckCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, passwordConfirm);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 via-white to-mint-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-mint-300 opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-lilac-300 opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-sunny-300 opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-black opacity-5 transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border-4 border-black border-opacity-10 transform -rotate-12"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-memphis-lg shadow-memphis-lg border-4 border-black p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-mint-400 to-sunny-400 rounded-memphis flex items-center justify-center transform rotate-6 shadow-memphis">
                <span className="text-4xl font-black text-white">+</span>
              </div>
            </div>
            <h1 className="text-4xl font-black text-black uppercase mb-2 tracking-tight">Join TaskFlow</h1>
            <p className="text-black opacity-60 font-bold">Create your account and start organizing</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-memphis-sm flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-700 font-bold text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-black opacity-50" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-mint-500 bg-peach-50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-black opacity-50" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-mint-500 bg-peach-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-black opacity-50" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-mint-500 bg-peach-50"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-black text-black uppercase mb-2">Confirm Password</label>
              <div className="relative">
                <CheckCircle className="absolute left-4 top-3.5 text-black opacity-50" size={20} />
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-memphis-sm font-bold placeholder-black placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-mint-500 bg-peach-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-mint-500 to-mint-600 text-white font-black uppercase rounded-memphis shadow-memphis hover:shadow-memphis-lg transform hover:rotate-1 transition-all duration-200 border-2 border-black border-opacity-20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-1 bg-black opacity-10"></div>
            <span className="text-xs font-black text-black opacity-60 uppercase">or</span>
            <div className="flex-1 h-1 bg-black opacity-10"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-black font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-mint-600 hover:text-mint-700 underline font-black">
              Login here
            </Link>
          </p>
        </div>

        {/* Decorative accent */}
        <div className="mt-8 flex justify-center gap-3">
          <div className="w-3 h-3 bg-lilac-400 rounded-full"></div>
          <div className="w-3 h-3 bg-sunny-400 rounded-full"></div>
          <div className="w-3 h-3 bg-mint-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
