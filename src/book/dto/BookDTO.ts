import { AuthorDTO } from "../../author/dto/AuthorDTO";
import { GenreDTO } from "../../genre/dto/GenreDTO";
import { ObjectId } from "mongoose";

export class BookDTO {
  id: ObjectId;
  title: string;
  summary: string;
  isbn: string;
  author: AuthorDTO;
  genre: GenreDTO[];
}
