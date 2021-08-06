import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./schema/book.schema";
import { Model, ObjectId } from "mongoose";
import { BookMapper } from "./mapper/book.mapper";
import { BookDTO } from "./dto/BookDTO";
import { BookCreationDTO } from "./dto/BookCreationDTO";
import { AuthorService } from "../author/author.service";
import { GenreService } from "../genre/genre.service";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
    private bookMapper: BookMapper,
  ) {}

  async getAllBooks(): Promise<BookDTO[]> {
    const books = await this.bookModel.find().populate(["author", "genre"]);
    return books.map((book) => this.bookMapper.mapToDTO(book));
  }

  async getBookById(id: ObjectId): Promise<BookDTO> {
    const book = await this.bookModel
      .findById(id)
      .orFail(new NotFoundException(`Book with id: '${id}' not found.`))
      .populate(["author", "genre"]);

    return this.bookMapper.mapToDTO(book);
  }

  async deleteBookById(id: ObjectId) {
    const book = await this.bookModel
      .findByIdAndDelete(id)
      .orFail(new NotFoundException(`Can't delete book with id: '${id}' because doesn't exists.`))
      .populate(["author", "genre"]);

    return this.bookMapper.mapToDTO(book);
  }

  async createBook(bookCreationDto: BookCreationDTO) {
    await this.authorService.getAuthorById(bookCreationDto.author);

    if (bookCreationDto.genre)
      for (const genreId of bookCreationDto.genre) await this.genreService.getGenreById(genreId);

    const savedBook = await new this.bookModel(bookCreationDto).save();
    await this.bookModel.populate(savedBook, [{ path: "author" }, { path: "genre" }]);
    return this.bookMapper.mapToDTO(savedBook);
  }
}
