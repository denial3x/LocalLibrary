import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ required: true, maxLength: 100, trim: true })
  first_name: string;

  @Prop({ required: true, maxLength: 100, trim: true })
  family_name: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  date_of_death: Date;
}

/*
 TODO Build Virtual Props
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
*/
export const AuthorSchema = SchemaFactory.createForClass(Author);
