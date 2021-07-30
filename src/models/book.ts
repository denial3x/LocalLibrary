import mongoose, { Schema } from "mongoose";

interface Book {
  _id: string;
  title: string;
  author: string;
  summary: string;
  isbn: string;
  genre: string[];
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

bookSchema.virtual("url").get(function (this: Book) {
  return `/catalog/book/${this._id}`;
});

export default mongoose.model("Book", bookSchema);
