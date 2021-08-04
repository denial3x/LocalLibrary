import { ObjectId } from "mongoose";

export interface IBook {
  _id: ObjectId;
  title: string;
  author: ObjectId;
  summary: string;
  isbn: string;
  genre: string[];
}
