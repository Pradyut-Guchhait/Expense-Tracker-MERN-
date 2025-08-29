import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Charts(){
  const [cat, setCat] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => { (async()=>{
    const { data: c } = await api.get('/analytics/category');
    setCat(c.rows.map(r => ({ name: r.category, value: r.total })));
    const { data: t } = await api.get('/analytics/trends', { params: { range: '6m' } });
    setTrend(t.map(d => ({ name: d.ym, total: d.total })));
  })(); }, []);

  return (
    <div className="grid-2">
      <div className="card">
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie dataKey="value" data={cat} outerRadius={100} label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <h3>Spending Trend (6 months)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /><YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f7cff" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
