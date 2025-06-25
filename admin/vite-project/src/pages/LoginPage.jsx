// src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // allow cookie
    });

    if (res.ok) {
      navigate('/admin/dashboard');
    } else {
      const data = await res.json();
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
