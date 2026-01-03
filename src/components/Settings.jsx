import React, { useState } from 'react';

export default function Settings({ user, onLogout }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/users/me', {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        onLogout();
      } else {
        alert('Failed to delete account');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while deleting account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-dropdown">
      <div className="bg-bg-card rounded-2xl border border-primary-light overflow-hidden shadow-xl">
        <div className="p-6 border-b border-primary-light bg-primary-light/10">
          <h2 className="text-xl font-bold text-text-main">Account Settings</h2>
          <p className="text-sm text-text-muted">Manage your account preferences and security.</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Mock General Settings */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest">Preferences</h3>
            <div className="space-y-4">
              <ToggleItem label="Email Notifications" description="Receive updates about new resources in your department." defaultChecked={true} />
              <ToggleItem label="AI Recommendations" description="Allow NileAI to suggest materials based on your activity." defaultChecked={true} />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-8 border-t border-red-500/20 space-y-4">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">Danger Zone</h3>
            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-text-main font-bold">Delete Account</h4>
                <p className="text-sm text-text-muted">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-bg-card border border-primary-light p-8 rounded-2xl max-w-md w-full shadow-2xl animate-dropdown">
            <h3 className="text-2xl font-bold text-text-main mb-4">Are you absolutely sure?</h3>
            <p className="text-text-muted mb-8 text-balance">
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-primary-light text-text-main rounded-xl hover:bg-primary-light/80 transition-colors font-medium"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-bold shadow-lg shadow-red-500/20"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleItem({ label, description, defaultChecked }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary-light/20 transition-colors border border-transparent hover:border-primary-light">
      <div>
        <h4 className="text-text-main font-medium">{label}</h4>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
      </label>
    </div>
  );
}
