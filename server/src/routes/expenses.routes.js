import { Router } from 'express';
import Expense from '../models/Expense.js';
import { auth } from '../middleware/auth.js';
import { toCSV } from '../utils/csv.js';

const r = Router();

// Add expense
r.post('/', auth, async (req, res, next) => {
  try {
    const doc = await Expense.create({ ...req.body, userId: req.user.id });
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// Get with filters & pagination
r.get('/', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, start, end, sort = '-date' } = req.query;
    const q = { userId: req.user.id };
    if (category) q.category = category;
    if (start || end) q.date = { ...(start && { $gte: new Date(start) }), ...(end && { $lte: new Date(end) }) };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Expense.find(q).sort(sort).skip(skip).limit(Number(limit)),
      Expense.countDocuments(q),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) { next(e); }
});

// Update
r.put('/:id', auth, async (req, res, next) => {
  try {
    const updated = await Expense.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (e) { next(e); }
});

// Delete
r.delete('/:id', auth, async (req, res, next) => {
  try {
    const del = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!del) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Export CSV
r.get('/export/csv', auth, async (req, res, next) => {
  try {
    const items = await Expense.find({ userId: req.user.id }).sort('-date');
    const csv = toCSV(items.map(i => ({
      date: i.date.toISOString().slice(0,10),
      category: i.category,
      amount: i.amount,
      description: i.description || ''
    })));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
    res.send(csv);
  } catch (e) { next(e); }
});

export default r;
