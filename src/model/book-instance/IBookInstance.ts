import { ObjectId } from "mongoose";
import { BookInstanceType } from "./BookInstanceType";

export interface IBookInstance {
  _id: ObjectId;
  book: ObjectId;
  imprint: string;
  status: BookInstanceType;
  due_back?: Date;
}
