import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const Ctx = createContext();
export const useExpenses = () => useContext(Ctx);

export default function ExpenseProvider({ children }){
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page:1, pages:1, total:0 });
  const [filters, setFilters] = useState({ category:'', start:'', end:'' });

  const fetchAll = async (page=1) => {
    const params = { ...filters, page, limit: 20 };
    const { data } = await api.get('/expenses', { params });
    setItems(data.items); setMeta({ page: data.page, pages: data.pages, total: data.total });
  };

  const add = async (payload) => { await api.post('/expenses', payload); await fetchAll(); };
  const update = async (id, payload) => { await api.put(`/expenses/${id}`, payload); await fetchAll(meta.page); };
  const remove = async (id) => { await api.delete(`/expenses/${id}`); await fetchAll(meta.page); };

  useEffect(() => { fetchAll(1); }, [filters.start, filters.end, filters.category]);

  return <Ctx.Provider value={{ items, meta, filters, setFilters, fetchAll, add, update, remove }}>{children}</Ctx.Provider>;
}
