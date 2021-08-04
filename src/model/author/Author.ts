import { model, Schema } from "mongoose";
import { DateTime } from "luxon";
import { IAuthor } from "./IAuthor";

const authorSchema = new Schema<IAuthor>({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual("name").get(function (this: IAuthor): string {
  return `${this.family_name}, ${this.first_name}`;
});

authorSchema.virtual("lifespan").get(function (this: IAuthor): string {
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

authorSchema.virtual("url").get(function (this: IAuthor): string {
  return "/catalog/author/" + this._id;
});

export default model<IAuthor>("Author", authorSchema);
