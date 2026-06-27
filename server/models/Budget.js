const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true, min: 0 },
  month: { type: String, required: true }, // "2024-01"
  currency: { type: String, default: "USD" },
}, { timestamps: true });

budgetSchema.index({ userId: 1, month: 1 });
budgetSchema.virtual("spent").get(function() { return 0; });

module.exports = mongoose.model("Budget", budgetSchema);
