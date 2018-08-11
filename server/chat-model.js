import mongoose,{Schema} from "mongoose"
const chatSchema = new Schema({
  messageId: String,
  bothSide: [
    {
      user: { type: Schema.Types.ObjectId },
      name: { type: String },
      lastId: { type: String }
    }
  ],
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      to: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      message: String,
      date: { type: Date, default: Date.now() }
    }
  ]
});
const chat = mongoose.model("chat", chatSchema);
export default chat;
