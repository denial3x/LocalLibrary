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

export const AuthorSchema = SchemaFactory.createForClass(Author);
