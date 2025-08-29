import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    try { await login(form.email, form.password); nav('/dashboard'); } 
    catch (e) { alert(e.response?.data?.message || 'Login failed'); }
  };
  return (
    <form onSubmit={submit} className="card stack" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2 style={{ margin: 0 }}>Login</h2>
      <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input className="input" name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
      <button className="btn btn-primary">Login</button>
      <div className="muted">New here? <Link to="/register">Register</Link></div>
    </form>
  );
}
