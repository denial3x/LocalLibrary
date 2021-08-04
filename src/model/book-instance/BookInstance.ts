import { model, Schema } from "mongoose";
import { IBookInstance } from "./IBookInstance";

const bookInstanceSchema = new Schema<IBookInstance>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

bookInstanceSchema.virtual("url").get(function (this: IBookInstance) {
  return `/catalog/bookinstance/${this._id}`;
});

export default model<IBookInstance>("BookInstance", bookInstanceSchema);
