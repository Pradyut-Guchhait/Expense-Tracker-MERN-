import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Register(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    try { await register(form); alert('Registered! Please login.'); nav('/login'); } 
    catch (e) { alert(e.response?.data?.message || 'Register failed'); }
  };
  return (
    <form onSubmit={submit} className="card stack" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2 style={{ margin: 0 }}>Register</h2>
      <input className="input" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input className="input" name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
      <button className="btn btn-primary">Register</button>
      <div className="muted">Have an account? <Link to="/login">Login</Link></div>
    </form>
  );
}
