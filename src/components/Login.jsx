import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Login attempt', formData);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Navigate directly to dashboard
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else {
        setError(data.msg || 'Login failed. Please try again.');
        console.error('Login Failed:', data.msg);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center container-custom">
      <div className="bg-bg-card p-8 rounded-2xl shadow-2xl border border-primary-light w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome <span className="text-accent-gold">Back</span>
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-text-muted mb-2 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="student@university.edu"
              required
            />
          </div>
          <div>
            <label className="block text-text-muted mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary justify-center"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="mt-6 text-center text-text-muted text-sm">
          Don't have an account? <a href="#" className="text-accent-gold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
