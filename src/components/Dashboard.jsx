import React, { useState, useEffect, useRef } from 'react';
import UploadResource from './UploadResource';
import ResourceList from './ResourceList';
import NileAI from './NileAI';
import Profile from './Profile';
import Settings from './Settings';
import HelpSupport from './HelpSupport';

export default function Dashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'browse_resources', 'upload_resource', 'profile', 'settings', 'help'
  const [refreshResources, setRefreshResources] = useState(0);
  const [recentUploads, setRecentUploads] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch recent uploads and total count
    const fetchRecentUploads = async () => {
      try {
        const response = await fetch('/api/resources?limit=5');
        const data = await response.json();
        setRecentUploads(data.slice(0, 5)); // Get only the 5 most recent
        setUploadCount(data.length); // Total count
      } catch (err) {
        console.error('Error fetching recent uploads:', err);
      }
    };

    if (currentView === 'dashboard') {
      fetchRecentUploads();
    }
  }, [currentView, refreshResources]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUploadSuccess = () => {
    setRefreshResources(prev => prev + 1);
    setCurrentView('browse_resources'); // Switch to browse view after successful upload
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setShowProfileDropdown(false);
  };

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-light/30 border-r border-primary-light hidden md:flex flex-col">
        <div className="p-6 border-b border-primary-light">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity cursor-pointer text-left"
          >
            <span className="text-accent-gold">Nile</span><span className="text-text-main">Vault</span>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-primary-light/50 text-accent-gold font-medium' : 'text-text-muted hover:bg-primary-light hover:text-text-main'}`}
          >
            <span>📊</span> Dashboard
          </button>

          <button
            onClick={() => setCurrentView('browse_resources')}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${currentView === 'browse_resources' ? 'bg-primary-light/50 text-accent-gold font-medium' : 'text-text-muted hover:bg-primary-light hover:text-text-main'}`}
          >
            <span>📚</span> Browse Resources
          </button>

          <button
            onClick={() => setCurrentView('upload_resource')}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${currentView === 'upload_resource' ? 'bg-primary-light/50 text-accent-gold font-medium' : 'text-text-muted hover:bg-primary-light hover:text-text-main'}`}
          >
            <span>📤</span> Upload Resource
          </button>

          <a href="#" className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-primary-light hover:text-text-main rounded-lg transition-colors">
            <span>💾</span> Saved Items
          </a>
        </nav>

        <div className="p-4 border-t border-primary-light">
          <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-red-400 transition-colors w-full">
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2 uppercase tracking-widest font-bold">
              <button onClick={() => setCurrentView('dashboard')} className="hover:text-accent-gold transition-colors">NileVault</button>
              <span>/</span>
              <span className="text-accent-gold">{currentView.replace('_', ' ')}</span>
            </div>
            <h1 className="text-3xl font-bold text-text-main">
              {currentView === 'dashboard' ? `Welcome back, ${user?.name.split(' ')[0]} 👋` :
                currentView === 'browse_resources' ? 'Browse Resources' :
                  currentView === 'upload_resource' ? 'Upload Resource' :
                    currentView === 'profile' ? 'Your Profile' :
                      currentView === 'settings' ? 'Account Settings' :
                        currentView === 'help' ? 'Help & Support' : ''}
            </h1>
            {currentView === 'dashboard' && <p className="text-text-muted text-sm mt-1">{user?.department} • Level {user?.level}</p>}
          </div>

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-1.5 pl-4 rounded-full bg-primary-light/20 border border-primary-light hover:bg-primary-light/40 transition-all cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-text-main leading-tight group-hover:text-accent-gold transition-colors">{user?.name.split(' ')[0]}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-tighter">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-gold text-primary font-bold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                {user?.name.charAt(0)}
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-bg-card border border-primary-light rounded-xl shadow-2xl z-50 overflow-hidden animate-dropdown">
                <div className="p-4 border-b border-primary-light bg-primary-light/10">
                  <p className="text-sm font-bold text-text-main truncate">{user?.name}</p>
                  <p className="text-xs text-text-muted truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => navigateTo('profile')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:bg-primary-light hover:text-text-main rounded-lg transition-colors cursor-pointer text-left"
                  >
                    <span>👤</span> View Profile
                  </button>
                  <button
                    onClick={() => navigateTo('settings')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:bg-primary-light hover:text-text-main rounded-lg transition-colors cursor-pointer text-left"
                  >
                    <span>⚙️</span> Account Settings
                  </button>
                  <button
                    onClick={() => navigateTo('help')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:bg-primary-light hover:text-text-main rounded-lg transition-colors cursor-pointer text-left"
                  >
                    <span>❓</span> Help & Support
                  </button>
                </div>
                <div className="p-2 border-t border-primary-light">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer text-left"
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-light/20 p-8 rounded-xl border border-primary-light">
                  <div className="text-text-muted text-sm mb-2">Uploaded Resources</div>
                  <div className="text-4xl font-bold text-white">{uploadCount}</div>
                </div>
                <div className="bg-primary-light/20 p-8 rounded-xl border border-primary-light">
                  <div className="text-text-muted text-sm mb-2">Saved Resources</div>
                  <div className="text-4xl font-bold text-white">0</div>
                </div>
              </div>

              {/* Recent Activity */}
              {recentUploads.length > 0 && (
                <div className="bg-primary-light/10 rounded-xl border border-primary-light overflow-hidden">
                  <div className="p-6 border-b border-primary-light flex justify-between items-center">
                    <h3 className="font-bold text-text-main">Recent Uploads</h3>
                    <button
                      onClick={() => setCurrentView('browse_resources')}
                      className="text-sm text-accent-gold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-primary-light">
                    {recentUploads.map((resource) => (
                      <div key={resource._id || resource.id} className="p-4 hover:bg-primary-light/30 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xs font-semibold">
                            {String(resource.fileType || '').includes('pdf') ? 'PDF' : 'DOC'}
                          </div>
                          <div>
                            <h4 className="font-medium text-text-main">{resource.title}</h4>
                            <div className="text-xs text-text-muted">
                              {resource.category} • {new Date(resource.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <NileAI user={user} />
            </div>
          </div>
        )}

        {currentView === 'browse_resources' && (
          <div className="space-y-8 animate-dropdown">
            <ResourceList refreshTrigger={refreshResources} />
          </div>
        )}

        {currentView === 'upload_resource' && (
          <div className="space-y-8 animate-dropdown">
            <UploadResource onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {currentView === 'profile' && <Profile user={user} />}
        {currentView === 'settings' && <Settings user={user} onLogout={onLogout} />}
        {currentView === 'help' && <HelpSupport />}
      </main>
    </div>
  );
}
