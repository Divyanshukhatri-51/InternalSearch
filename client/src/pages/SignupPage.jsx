import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful.');
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-8 mt-16 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="username"
          className="w-full p-3 border rounded"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="w-full p-3 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700">
          Register
        </button>
      </form>
      <div className="mt-6 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
