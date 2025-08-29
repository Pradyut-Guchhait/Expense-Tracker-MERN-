import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);

function getInitialTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export default function ThemeProvider({ children }){
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}


