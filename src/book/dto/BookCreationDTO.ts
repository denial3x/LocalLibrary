import { IsArray, IsISBN, IsMongoId, IsOptional } from "class-validator";
import { ObjectId } from "mongoose";
import { IsNotBlank } from "../../validator/IsNotBlank";

export class BookCreationDTO {
  @IsNotBlank()
  title: string;

  @IsNotBlank()
  summary: string;

  @IsISBN()
  isbn: string;

  @IsMongoId()
  author: ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  genre: ObjectId[];
}
