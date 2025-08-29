import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';
import { startReminders } from './jobs/reminders.cron.js';

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => console.log(`API on :${port}`));
  startReminders();
});
