import React, { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

function safeGetUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
}

export default function AuthProvider({ children }){
  const [user, setUser] = useState(safeGetUser);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const register = (payload) => api.post('/auth/register', payload);
  const logout = () => { localStorage.clear(); setUser(null); };

  const refreshMe = async () => {
    const { data } = await api.get('/users/me');
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const updateMe = async (payload) => {
    const { data } = await api.patch('/users/me', payload);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  return <AuthCtx.Provider value={{ user, login, register, logout, refreshMe, updateMe }}>{children}</AuthCtx.Provider>;
}
