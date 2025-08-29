import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useTheme } from '../theme/ThemeProvider';

export default function Navbar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const doLogout = () => { logout(); nav('/login'); };
  return (
    <nav className="nav">
      <span className="nav-title">Expense Tracker</span>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/settings">Settings</Link>
      <div className="spacer" />
      <div>
        {user ? (
          <>
            <span className="muted" style={{ marginRight: 8 }}>Hi, {user.name}</span>
            <button className="btn" onClick={doLogout}>Logout</button>
          </>
        ) : (
          <Link className="btn" to="/login">Login</Link>
        )}
        <button className="btn" onClick={toggle} style={{ marginRight: 8 }}>{theme === 'light' ? '🌞 Light' : '🌙 Dark'}</button>
      </div>
    </nav>
  );
}
