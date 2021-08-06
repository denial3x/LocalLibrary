import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { ParseObjectIdPipe } from "../pipe/parse-object-id.pipe";
import { ObjectId } from "mongoose";
import { AuthorDTO } from "./dto/AuthorDTO";
import { AuthorCreationDTO } from "./dto/AuthorCreationDTO";

@Controller("authors")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors() {
    return await this.authorService.getAllAuthors();
  }

  @Get(":id")
  async getAuthorById(@Param("id", new ParseObjectIdPipe()) id: ObjectId): Promise<AuthorDTO> {
    return await this.authorService.getAuthorById(id);
  }

  @Post()
  async createAuthor(@Body() authorCreationDTO: AuthorCreationDTO): Promise<AuthorDTO> {
    return await this.authorService.createAuthor(authorCreationDTO);
  }

  @Delete(":id")
  async deleteAuthorById(@Param("id", new ParseObjectIdPipe()) id: ObjectId): Promise<AuthorDTO> {
    return await this.authorService.deleteAuthorById(id);
  }
}
