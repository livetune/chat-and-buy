import mongoose, { Schema } from "mongoose";

const allOrdersSchema = Schema({
  price: { type: Number, require: true },
  desc: { type: String, require: true },
  count: { type: Number, require: true },
  state: { type: Number, requrie: true },
  date: { type: Date, requrie: true },
  customer: { type: Schema.Types.ObjectId, ref: "user" },
  deliver: { type: Schema.Types.ObjectId, ref: "user" }
});
const allOrders = mongoose.model("allOrder", allOrdersSchema);
export default allOrders;
