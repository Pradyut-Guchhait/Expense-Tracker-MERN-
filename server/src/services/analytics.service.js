import Expense from '../models/Expense.js';
import mongoose from 'mongoose';

export const monthlySummary = async (userId, monthISO) => {
  const start = monthISO ? new Date(monthISO + '-01') : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
  const [sum] = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: start, $lt: end } } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return { total: sum?.total || 0, start, end };
};

export const categoryBreakdown = async (userId, start, end) => {
  const s = start ? new Date(start) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const e = end ? new Date(end) : new Date(s.getFullYear(), s.getMonth() + 1, 1);
  const rows = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: s, $lt: e } } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $project: { _id: 0, category: '$_id', total: 1 } },
    { $sort: { total: -1 } }
  ]);
  return { start: s, end: e, rows };
};

export const trends = async (userId, range = '6m') => {
  const now = new Date();
  const s = range === '90d' ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90)
            : range === '12m' ? new Date(now.getFullYear()-1, now.getMonth(), 1)
            : new Date(now.getFullYear(), now.getMonth()-5, 1);
  const rows = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: s, $lte: now } } },
    { $group: { _id: { y: { $year: '$date' }, m: { $month: '$date' } }, total: { $sum: '$amount' } } },
    { $project: { y: '$_id.y', m: '$_id.m', total: 1 } },
    { $sort: { y: 1, m: 1 } }
  ]);

  // Normalize to YYYY-MM and fill missing months with 0
  const pad = (n) => String(n).padStart(2, '0');
  const map = new Map(rows.map(r => [ `${r.y}-${pad(r.m)}`, r.total ]));
  const months = [];
  const cursor = new Date(s.getFullYear(), s.getMonth(), 1);
  while (cursor <= now) {
    const key = `${cursor.getFullYear()}-${pad(cursor.getMonth()+1)}`;
    months.push({ ym: key, total: map.get(key) || 0 });
    cursor.setMonth(cursor.getMonth()+1);
  }
  return months;
};
