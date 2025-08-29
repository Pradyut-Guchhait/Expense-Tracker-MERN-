import React from 'react';
import { useExpenses } from './ExpenseProvider';
import Filters from './Filters';

export default function ExpenseList(){
  const { items, meta, fetchAll, remove } = useExpenses();
  return (
    <div className="stack">
      <Filters/>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Category</th><th className="right">Amount</th><th>Description</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(x => (
            <tr key={x._id}>
              <td>{String(x.date).slice(0,10)}</td>
              <td>{x.category}</td>
              <td className="right">{x.amount}</td>
              <td>{x.description}</td>
              <td className="right"><button className="btn btn-danger" onClick={()=>remove(x._id)}>Delete</button></td>
            </tr>
          ))}
          {!items.length && <tr><td colSpan={5} className="center muted" style={{ padding: 24 }}>No expenses</td></tr>}
        </tbody>
      </table>
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
        <button className="btn" disabled={meta.page<=1} onClick={()=>fetchAll(meta.page-1)}>Prev</button>
        <span className="muted">Page {meta.page} / {meta.pages}</span>
        <button className="btn" disabled={meta.page>=meta.pages} onClick={()=>fetchAll(meta.page+1)}>Next</button>
      </div>
    </div>
  );
}
