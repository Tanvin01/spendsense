# SpendSense — Personal Finance & Budget Tracker

![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

A full-featured personal finance tracker with expense categorisation, budget goals, visual spending analytics, and recurring transaction support.

## ✨ Features

- **Transaction Management** — Add/edit/delete income and expense transactions
- **Smart Categorisation** — 20+ categories with custom category support
- **Budget Goals** — Set monthly budgets per category with progress tracking
- **Visual Analytics** — Doughnut, bar, and line charts (Chart.js)
- **Recurring Transactions** — Auto-schedule weekly/monthly repeating entries
- **Multi-Currency** — Live exchange rates via Open Exchange Rates API
- **CSV Export** — Download transactions as spreadsheet
- **Spending Insights** — Month-over-month comparison and trend detection
- **Dark Mode** — Full dark/light theme with system preference detection

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Deployment | Render (backend) + Vercel (frontend) |

## 📊 Dashboard Preview

```
┌─────────────────────────────────────────────────────────┐
│  SpendSense                     Balance: $4,250.00       │
├───────────────────┬─────────────────────────────────────┤
│  Income  $6,500   │         Spending by Category        │
│  Expenses $2,250  │    ┌──────────────────────────┐    │
│  Savings  34.6%   │    │   [Doughnut Chart]       │    │
│                   │    └──────────────────────────┘    │
├───────────────────┴─────────────────────────────────────┤
│  Monthly Trend    [Line Chart: 6 month view]            │
├─────────────────────────────────────────────────────────┤
│  Recent Transactions              Budget Progress        │
│  🛒 Groceries  -$85  2h ago      Food   ████░  68%      │
│  💰 Salary    +$3250 Yesterday   Travel ██░░░  40%      │
│  🎬 Netflix    -$16  3 days ago  Entertainment ███  90% │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

```bash
git clone https://github.com/Tanvin01/spendsense.git
cd spendsense
npm install
```

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/spendsense
JWT_SECRET=your-jwt-secret
EXCHANGE_RATES_API_KEY=your-api-key
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev    # Starts both frontend (5173) and backend (5000)
```

## 🗂 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/transactions?month=2024-01&category=food
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/budgets
POST   /api/budgets
GET    /api/analytics/summary?period=monthly
GET    /api/analytics/trends
GET    /api/transactions/export/csv
```
