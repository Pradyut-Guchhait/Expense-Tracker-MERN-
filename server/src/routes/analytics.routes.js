import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import { monthlySummary, categoryBreakdown, trends } from '../services/analytics.service.js';

const r = Router();

r.get('/summary', auth, async (req, res, next) => {
  try {
    const { month } = req.query; // 'YYYY-MM'
    const summary = await monthlySummary(req.user.id, month);
    const user = await User.findById(req.user.id).lean();
    const remaining = Math.max((user?.monthlyBudget || 0) - summary.total, 0);
    res.json({ total: summary.total, monthlyBudget: user?.monthlyBudget || 0, remaining, start: summary.start, end: summary.end });
  } catch (e) { next(e); }
});

r.get('/category', auth, async (req, res, next) => {
  try {
    const { start, end } = req.query;
    res.json(await categoryBreakdown(req.user.id, start, end));
  } catch (e) { next(e); }
});

r.get('/trends', auth, async (req, res, next) => {
  try {
    const { range } = req.query; // '12m'|'6m'|'90d'
    res.json(await trends(req.user.id, range));
  } catch (e) { next(e); }
});

export default r;
