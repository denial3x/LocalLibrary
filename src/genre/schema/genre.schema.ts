import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({ required: true, minlength: 3, maxlength: 100, unique: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
