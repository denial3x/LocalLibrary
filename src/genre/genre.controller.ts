import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreDTO } from "./dto/GenreDTO";
import { GenreCreationDTO } from "./dto/GenreCreationDTO";
import { ObjectId } from "mongoose";
import { ParseObjectIdPipe } from "../pipes/parse-object-id.pipe";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenres(): Promise<GenreDTO[]> {
    return await this.genreService.getAllGenres();
  }

  @Get(":id")
  async getGenreById(@Param("id", new ParseObjectIdPipe()) id: ObjectId): Promise<GenreDTO> {
    return await this.genreService.getGenreById(id);
  }

  @Post()
  async createGenre(@Body() genreCreationDTO: GenreCreationDTO): Promise<GenreDTO> {
    return await this.genreService.createGenre(genreCreationDTO);
  }

  @Delete(":id")
  async deleteGenreById(@Param("id", new ParseObjectIdPipe()) id: ObjectId): Promise<GenreDTO> {
    return await this.genreService.deleteGenreById(id);
  }
}
