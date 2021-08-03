import { model, ObjectId, Schema } from "mongoose";

interface Genre {
  _id: ObjectId;
  name: string;
}

const genreSchema = new Schema<Genre>({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

genreSchema.virtual("url").get(function (this: Genre): string {
  return `/catalog/genres/${this._id}`;
});

export default model<Genre>("Genre", genreSchema);
