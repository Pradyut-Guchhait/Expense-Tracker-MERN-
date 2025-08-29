import React, { useEffect, useState } from 'react';
import api from '../api/client';

export default function BudgetMeter(){
  const [data, setData] = useState({ total:0, monthlyBudget:0, remaining:0 });
  useEffect(() => { (async()=>{ const { data } = await api.get('/analytics/summary'); setData(data); })(); }, []);
  const pct = data.monthlyBudget ? Math.min(100, Math.round((data.total / data.monthlyBudget) * 100)) : 0;
  return (
    <div style={{ padding:12, border:'1px solid #eee', borderRadius:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}><strong>Monthly Budget</strong><span>{pct}% used</span></div>
      <div style={{ width:'100%', height:12, background:'#eee', borderRadius:6 }}>
        <div style={{ height:12, width:`${pct}%`, background: pct>=80? 'crimson':'seagreen', borderRadius:6 }} />
      </div>
      <div style={{ marginTop:8, fontSize:12 }}>Spent: {data.total} | Budget: {data.monthlyBudget} | Remaining: {data.remaining}</div>
    </div>
  );
}
