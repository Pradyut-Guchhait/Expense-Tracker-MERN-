import { Router } from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const r = Router();

// Get current user profile
r.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email monthlyBudget');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user._id, name: user.name, email: user.email, monthlyBudget: user.monthlyBudget });
  } catch (e) { next(e); }
});

// Update current user (allow whitelisted fields)
r.patch('/me', auth, async (req, res, next) => {
  try {
    const allowed = ['name', 'monthlyBudget'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );
    if (updates.monthlyBudget != null) {
      updates.monthlyBudget = Number(updates.monthlyBudget) || 0;
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true })
      .select('name email monthlyBudget');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user._id, name: user.name, email: user.email, monthlyBudget: user.monthlyBudget });
  } catch (e) { next(e); }
});

export default r;


