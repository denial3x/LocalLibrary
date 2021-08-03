import { model, Schema, ObjectId } from "mongoose";

interface IBook {
  _id: ObjectId;
  title: string;
  author: ObjectId;
  summary: string;
  isbn: string;
  genre: string[];
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

bookSchema.virtual("url").get(function (this: IBook) {
  return `/catalog/book/${this._id}`;
});

export default model<IBook>("Book", bookSchema);
