const router = require("express").Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.use(auth);

router.get("/summary", async (req, res) => {
  try {
    const { month } = req.query;
    const [y, m] = (month || new Date().toISOString().slice(0, 7)).split("-");
    const dateRange = { $gte: new Date(y, m - 1, 1), $lt: new Date(y, m, 1) };
    const txs = await Transaction.find({ userId: req.user._id, date: dateRange });
    const income = txs.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = txs.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const byCategory = txs.filter(t => t.type === "expense").reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount; return acc;
    }, {});
    res.json({ income, expenses, balance: income - expenses, savingsRate: income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0, byCategory });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/trends", async (req, res) => {
  try {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      months.push({ year: d.getFullYear(), month: d.getMonth() });
    }
    const trends = await Promise.all(months.map(async ({ year, month }) => {
      const txs = await Transaction.find({ userId: req.user._id, date: { $gte: new Date(year, month, 1), $lt: new Date(year, month + 1, 1) } });
      return {
        label: new Date(year, month).toLocaleString("default", { month: "short", year: "2-digit" }),
        income: txs.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
        expenses: txs.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
      };
    }));
    res.json(trends);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
