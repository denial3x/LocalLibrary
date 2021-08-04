import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreDTO } from "./dto/GenreDTO";
import { GenreCreationDTO } from "./dto/GenreCreationDTO";
import { MongoObjectId } from "../MongoObjectId";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenres(): Promise<GenreDTO[]> {
    return await this.genreService.getAllGenres();
  }

  @Get(":id")
  async getGenreById(@Param() mongoObjectId: MongoObjectId): Promise<GenreDTO> {
    return await this.genreService.getGenreById(mongoObjectId.id);
  }

  @Post()
  async createGenre(@Body() genreCreationDTO: GenreCreationDTO) {
    return await this.genreService.createGenre(genreCreationDTO);
  }
}
