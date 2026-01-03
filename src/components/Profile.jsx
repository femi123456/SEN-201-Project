import React from 'react';

export default function Profile({ user }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-dropdown">
      <div className="bg-bg-card rounded-2xl border border-primary-light p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-primary-light">
          <div className="w-32 h-32 rounded-full bg-accent-gold text-primary font-bold text-4xl flex items-center justify-center shadow-2xl">
            {user?.name.charAt(0)}
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-text-main">{user?.name}</h2>
            <p className="text-accent-gold font-medium">{user?.role.toUpperCase()}</p>
            <p className="text-text-muted">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <span>🎓</span> Academic Information
            </h3>
            <div className="space-y-3">
              <ProfileItem label="Matric Number" value={user?.matricNumber || 'Not Set'} />
              <ProfileItem label="Department" value={user?.department || 'Not Set'} />
              <ProfileItem label="Level" value={user?.level || 'Not Set'} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <span>📅</span> Account Details
            </h3>
            <div className="space-y-3">
              <ProfileItem label="Member Since" value={new Date(user?.createdAt).toLocaleDateString()} />
              <ProfileItem label="Account ID" value={user?.id || user?._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="bg-primary/50 p-4 rounded-xl border border-primary-light/50">
      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className="text-text-main font-medium">{value}</p>
    </div>
  );
}
