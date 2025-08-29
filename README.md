# Expense Tracker (MERN)

A full-stack expense tracking application built with MongoDB, Express, React, and Node.js. Features include authentication, expense CRUD, filtering, analytics, charts, CSV export, email reminders, theming, and user settings.

## Demo

![Login/Registration].(assets/login.png)
![Dashboard].(dashboard-b.png)
![Setting/Budget].(assets/Budget.png)
![Light_Mode].(assets/dasboard-w.png)

## Tech Stack
- API: Node.js, Express, MongoDB (Mongoose)
- Web: React, Vite, React Router, Recharts

## Monorepo Layout
```
./
├─ server/       # Express API and background jobs
└─ web/          # React (Vite) frontend
```

## Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)

## Setup
Clone and install dependencies:
```
git clone <this-repo-url>
cd Expense Tracker

# API
cd server
npm install
cp .env.example .env

# Web
cd ../web
npm install
cp .env.example .env
```

### Environment Variables

Create `.env` files based on the provided examples. Typical variables:

Server (`server/.env`):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker [change_me]
JWT_SECRET=change_me
BASE_URL=http://localhost:5000
```

Web (`web/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

## Running Locally

Start API (dev):
```
cd server
npm run dev
```

Start Web (dev):
```
cd web
npm run dev
```

Visit `http://localhost:5173` and ensure `VITE_API_URL` points to your API base, e.g. `http://localhost:5000/api`.

## Available Scripts

Server (`server/`):
- `npm run dev`: Start API with noassetsn
- `npm start`: Start API (production)

Web (`web/`):
- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Features
- Authentication (register/login, JWT)
- Expense CRUD with categories, notes, amount, date
- Filters by date range, category, text search
- Analytics service with charts (Recharts) and budget meter
- Theming and user settings

## Project Structure

Server highlights:
- `src/app.js`: Express app and middleware
- `src/server.js`: Server bootstrap
- `src/models`: Mongoose models (`User`, `Expense`)
- `src/routes`: API routes (`auth`, `expenses`, `analytics`, `users`)
- `src/services`: Analytics services
- `src/middleware`: Auth and error middleware

Web highlights:
- `src/App.jsx`: App routes
- `src/auth`: Auth provider and screens
- `src/components`: Shared components (Navbar, PrivateRoute)
- `src/dashboard`: Dashboard widgets (Charts, BudgetMeter)
- `src/expenses`: Expense form, list, filters, provider
- `src/theme`: Theme provider
- `src/utils`: Helpers (formatting, API client)

## API Base Path
All API endpoints are prefixed with `/api`. Set `VITE_API_URL` accordingly.

## Production Build
```
# API
cd server && npm ci && npm run start

# Web
cd web && npm ci && npm run build
```
Serve the `web/dist` directory with any static server and deploy the API separately.

## License
MIT
