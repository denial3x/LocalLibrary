import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BookDTO } from "./dto/BookDTO";
import { BookService } from "./book.service";
import { ParseObjectIdPipe } from "../pipe/parse-object-id.pipe";
import { ObjectId } from "mongoose";
import { BookCreationDTO } from "./dto/BookCreationDTO";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<BookDTO[]> {
    return this.bookService.getAllBooks();
  }

  @Get(":id")
  async getBookById(@Param("id", new ParseObjectIdPipe()) id: ObjectId) {
    return this.bookService.getBookById(id);
  }

  @Delete(":id")
  async deleteBookById(@Param("id", new ParseObjectIdPipe()) id: ObjectId) {
    return this.bookService.deleteBookById(id);
  }

  @Post()
  async createBook(@Body() bookCreationDto: BookCreationDTO) {
    return this.bookService.createBook(bookCreationDto);
  }
}
