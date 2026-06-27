const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
  date: { type: Date, required: true, default: Date.now },
  currency: { type: String, default: "USD" },
  tags: [String],
  recurring: { type: String, enum: ["none","daily","weekly","monthly"], default: "none" },
}, { timestamps: true });

transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
