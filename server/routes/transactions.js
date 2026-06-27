const router = require("express").Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const { month, category, type, search, page = 1, limit = 20 } = req.query;
    const query = { userId: req.user._id };
    if (type) query.type = type;
    if (category) query.category = category;
    if (month) {
      const [y, m] = month.split("-");
      query.date = { $gte: new Date(y, m - 1, 1), $lt: new Date(y, m, 1) };
    }
    if (search) query.description = { $regex: search, $options: "i" };
    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort({ date: -1 }).skip((page - 1) * limit).limit(+limit),
      Transaction.countDocuments(query),
    ]);
    res.json({ transactions, total, pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", async (req, res) => {
  try {
    const tx = await Transaction.create({ ...req.body, userId: req.user._id });
    res.status(201).json(tx);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body, { new: true, runValidators: true }
    );
    if (!tx) return res.status(404).json({ error: "Not found" });
    res.json(tx);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!tx) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
