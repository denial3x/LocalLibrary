import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Author } from "../../author/schema/author.schema";
import { Genre } from "../../genre/schema/genre.schema";
import { isISBN } from "class-validator";

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  summary: string;

  @Prop({ required: true, validate: (isbn) => isISBN(isbn), trim: true })
  isbn: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true })
  author: Author;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }])
  genre: Genre[];
}

// TODO Build Virtual Property for REST "url" location of the resource.

export const BookSchema = SchemaFactory.createForClass(Book);
