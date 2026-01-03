import React, { useState } from 'react';

export default function Signup({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    matricNumber: '',
    department: '',
    level: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, matricNumber, department, level } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Signup attempt', formData);
    try {
      const response = await fetch('/api/auth/register', {
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
        setError(data.msg || 'Registration failed. Please try again.');
        console.error('Registration Failed:', data.msg);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center container-custom">
      <div className="bg-bg-card p-8 rounded-2xl shadow-2xl border border-primary-light w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Join <span className="text-accent-gold">NileVault</span>
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-text-muted mb-1 text-sm">Full Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm">Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} required
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted mb-1 text-sm">Matric No.</label>
              <input type="text" name="matricNumber" value={matricNumber} onChange={onChange}
                className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
            </div>
            <div>
              <label className="block text-text-muted mb-1 text-sm">Level</label>
              <select name="level" value={level} onChange={onChange}
                className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors">
                <option value="">Select Level</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm">Department</label>
            <input type="text" name="department" value={department} onChange={onChange}
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required
              className="w-full bg-primary-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary justify-center mt-4"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
