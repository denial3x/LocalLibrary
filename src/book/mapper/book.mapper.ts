import { Injectable } from "@nestjs/common";
import { BookDTO } from "../dto/BookDTO";
import { BookDocument } from "../schema/book.schema";
import { createSchema, morphism } from "morphism";

@Injectable()
export class BookMapper {
  public mapToDTO(bookDocument: BookDocument): BookDTO {
    const bookSchema = createSchema<BookDTO, BookDocument>({
      id: "_id",
      title: "title",
      summary: "summary",
      isbn: "isbn",
      author: "author",
      genre: "genre",
    });
    return morphism(bookSchema, bookDocument);
  }
}
