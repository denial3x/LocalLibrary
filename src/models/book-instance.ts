import { model, ObjectId, Schema } from "mongoose";

type BookInstanceType = "Available" | "Maintenance" | "Loaned" | "Reserved";

interface IBookInstance {
  _id: ObjectId;
  book: ObjectId;
  imprint: string;
  status: BookInstanceType;
  due_back?: Date;
}

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
