import React from 'react';
import { useExpenses } from './ExpenseProvider';

export default function Filters(){
  const { filters, setFilters } = useExpenses();
  return (
    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
      <select className="select" value={filters.category} onChange={e=>setFilters(f=>({ ...f, category: e.target.value }))}>
        <option value="">All categories</option>
        {['Food','Travel','Shopping','Bills','Entertainment','Other'].map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input className="input" type="date" value={filters.start} onChange={e=>setFilters(f=>({ ...f, start: e.target.value }))} />
      <span>to</span>
      <input className="input" type="date" value={filters.end} onChange={e=>setFilters(f=>({ ...f, end: e.target.value }))} />
    </div>
  );
}
