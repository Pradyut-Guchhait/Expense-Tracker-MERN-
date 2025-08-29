import React, { useState } from 'react';
import { useExpenses } from './ExpenseProvider';

export default function ExpenseForm(){
  const { add } = useExpenses();
  const [form, setForm] = useState({ amount:'', category:'Food', description:'', date: new Date().toISOString().slice(0,10) });
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => { e.preventDefault(); await add({ ...form, amount: Number(form.amount) }); setForm(f => ({ ...f, amount:'', description:'' })); };
  return (
    <form onSubmit={submit} className="card grid">
      <input className="input" name="amount" type="number" placeholder="Amount" value={form.amount} onChange={onChange} required />
      <select className="select" name="category" value={form.category} onChange={onChange}>
        {['Food','Travel','Shopping','Bills','Entertainment','Other'].map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input className="input" name="description" placeholder="Description" value={form.description} onChange={onChange} />
      <input className="input" name="date" type="date" value={form.date} onChange={onChange} />
      <button className="btn btn-primary">Add</button>
    </form>
  );
}
