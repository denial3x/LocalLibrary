import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookMapper } from "./mapper/book.mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./schema/book.schema";
import { AuthorModule } from "../author/author.module";
import { GenreModule } from "../genre/genre.module";

@Module({
  imports: [AuthorModule, GenreModule, MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookMapper],
})
export class BookModule {}
