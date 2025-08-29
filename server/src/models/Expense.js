import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

ExpenseSchema.index({ userId: 1, date: -1 });

export default mongoose.model('Expense', ExpenseSchema);
