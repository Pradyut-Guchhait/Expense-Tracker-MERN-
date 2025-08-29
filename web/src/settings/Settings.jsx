import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function Settings(){
  const { user, updateMe, refreshMe } = useAuth();
  const [mb, setMb] = useState(user?.monthlyBudget ?? (localStorage.getItem('monthlyBudget') || ''));
  useEffect(() => { if (user) setMb(user.monthlyBudget ?? 0); }, [user]);
  const save = () => {
    if (user) {
      updateMe({ monthlyBudget: Number(mb) || 0 }).then(()=>{
        alert('Saved');
      }).catch(err=>{
        alert(err.response?.data?.message || 'Failed to save');
      });
    } else {
      localStorage.setItem('monthlyBudget', mb);
      alert('Saved locally. Login to sync with your account.');
    }
  };
  return (
    <div className="card" style={{ maxWidth: 520 }}>
      <h2 style={{ marginTop:0 }}>Settings</h2>
      <p className="muted">Monthly budget</p>
      <div style={{ display:'flex', gap:8 }}>
        <input className="input" type="number" value={mb} onChange={e=>setMb(e.target.value)} />
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  );
}
