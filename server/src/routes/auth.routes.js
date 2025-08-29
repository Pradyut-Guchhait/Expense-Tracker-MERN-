import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const r = Router();

r.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email in use' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) { next(e); }
});

r.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, monthlyBudget: user.monthlyBudget } });
  } catch (e) { next(e); }
});

export default r;
