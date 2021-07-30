import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

interface Author {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth?: Date;
  date_of_death?: Date;
}

const authorSchema = new Schema<Author>({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual("name").get(function (this: Author): string {
  return `${this.family_name}, ${this.first_name}`;
});

authorSchema.virtual("lifespan").get(function (this: Author): string {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return lifetime_string;
});

authorSchema.virtual("url").get(function (this: Author): string {
  return "/catalog/author/" + this._id;
});

export default mongoose.model("Author", authorSchema);
