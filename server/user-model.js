import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  user: { type: String, require: true },
  pwd: { type: String, require: true },
  type: { type: String, require: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "allOrder" }]
});

const user = mongoose.model("user", userSchema);
export default user;
