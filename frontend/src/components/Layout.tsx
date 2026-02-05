import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 via-white to-mint-50">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-sunny-300 opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-lilac-300 opacity-15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 rounded-full bg-mint-300 opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-black opacity-5 transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border-4 border-black border-opacity-10 transform -rotate-12"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-black opacity-8 rounded-full"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white bg-opacity-70 backdrop-blur-md border-b-4 border-black shadow-memphis-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-12 h-12 bg-gradient-to-br from-sunny-400 to-lilac-400 rounded-memphis flex items-center justify-center transform -rotate-6 shadow-memphis">
                <span className="text-2xl font-black text-white">✓</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black text-black uppercase tracking-tight">TaskFlow</h1>
                <p className="text-xs text-black opacity-60 font-bold">Organize. Create. Achieve.</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user && (
                <>
                  <div className="text-right">
                    <p className="text-sm font-bold text-black">{user.name}</p>
                    <p className="text-xs text-black opacity-60">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lilac-500 to-lilac-600 text-white font-bold rounded-memphis shadow-memphis hover:shadow-memphis-lg transform hover:-rotate-1 transition-all duration-200 border-2 border-black border-opacity-20"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-memphis-sm"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && user && (
            <div className="md:hidden pb-4 border-t-2 border-black border-opacity-10">
              <div className="py-4 text-center">
                <p className="text-sm font-bold text-black">{user.name}</p>
                <p className="text-xs text-black opacity-60">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-lilac-500 to-lilac-600 text-white font-bold rounded-memphis shadow-memphis border-2 border-black border-opacity-20"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 bg-black bg-opacity-5 border-t-2 border-black border-opacity-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-black opacity-60">
            © 2024 TaskFlow. Built with creativity and passion. 🎨
          </p>
        </div>
      </footer>
    </div>
  );
};
