const router = require("express").Router();
const auth = require("../middleware/auth");
const Budget = require("../models/Budget");
router.use(auth);
router.get("/", async (req, res) => {
  const { month } = req.query;
  const query = { userId: req.user._id };
  if (month) query.month = month;
  res.json(await Budget.find(query));
});
router.post("/", async (req, res) => {
  try {
    const existing = await Budget.findOne({ userId: req.user._id, category: req.body.category, month: req.body.month });
    if (existing) { Object.assign(existing, req.body); await existing.save(); return res.json(existing); }
    const budget = await Budget.create({ ...req.body, userId: req.user._id });
    res.status(201).json(budget);
  } catch (e) { res.status(400).json({ error: e.message }); }
});
router.delete("/:id", async (req, res) => {
  await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: "Deleted" });
});
module.exports = router;
