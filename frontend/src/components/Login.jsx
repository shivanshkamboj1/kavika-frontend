import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const username = fd.get('username')?.toString().trim();
    const password = fd.get('password')?.toString().trim();

    if (!username || !password) {
      setError('Enter username and password');
      return;
    }

    setBusy(true);
    setError('');

    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="px-6 md:px-8 py-24 max-w-md mx-auto">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Admin</p>
      <h1 className="font-display text-4xl mb-2">Welcome back.</h1>
      <p className="text-muted-foreground mb-8 text-sm">Sign in to manage destinations and content.</p>

      <form onSubmit={onSubmit} className="space-y-4 bg-card p-8 rounded-2xl ring-1 ring-border">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Username</label>
          <input
            name="username"
            type="text"
            required
            className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Password</label>
          <input
            name="password"
            type="password"
            required
            className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          disabled={busy}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {busy ? '…' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">← Back to site</Link>
      </p>
    </section>
  );
};

export default Login;
