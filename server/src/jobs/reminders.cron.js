import cron from 'node-cron';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import { sendMail } from '../services/mailer.service.js';

export const startReminders = () => {
  const tz = process.env.CRON_TZ || 'UTC';

  // Daily reminder at 8 PM local
  cron.schedule('0 20 * * *', async () => {
    const users = await User.find({}, 'email name');
    await Promise.all(users.map(u => sendMail({
      to: u.email,
      subject: 'Daily Expense Reminder',
      html: `<p>Hi ${u.name || ''}, don\'t forget to log today\'s expenses!</p>`
    })));
  }, { timezone: tz });

  // Budget alert every morning if usage >= 80%
  cron.schedule('0 9 * * *', async () => {
    const users = await User.find({}, 'email name monthlyBudget');
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth()+1, 1);

    await Promise.all(users.map(async u => {
      if (!u.monthlyBudget) return;
      const agg = await Expense.aggregate([
        { $match: { userId: u._id, date: { $gte: start, $lt: end } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const spent = agg[0]?.total || 0;
      if (spent >= u.monthlyBudget * 0.8) {
        await sendMail({
          to: u.email,
          subject: 'Budget Alert — 80% used',
          html: `<p>You've used <b>${(spent/u.monthlyBudget*100).toFixed(0)}%</b> of your monthly budget.</p>`
        });
      }
    }));
  }, { timezone: tz });
};
