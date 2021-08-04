import { Model } from "mongoose";
import { GenreMapper } from "./mapper/genre.mapper";
import { GenreDTO } from "./dto/GenreDTO";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Genre, GenreDocument } from "./schema/genre.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GenreCreationDTO } from "./dto/GenreCreationDTO";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    private readonly genreMapper: GenreMapper,
  ) {}

  async getAllGenres(): Promise<GenreDTO[]> {
    const allGenres = await this.genreModel.find({}).orFail();
    return allGenres.map((genre) => this.genreMapper.mapToDTO(genre));
  }

  async getGenreById(id: string): Promise<GenreDTO> {
    const genre = await this.genreModel.findById(id).orFail(new NotFoundException(`Genre with id: '${id}' not found.`));
    return this.genreMapper.mapToDTO(genre);
  }

  async createGenre(genreCreationDTO: GenreCreationDTO) {
    if (await this.existsByName(genreCreationDTO.name))
      throw new InternalServerErrorException(`Genre with name: '${genreCreationDTO.name}' already exists.`);

    const savedGenre = await new this.genreModel(genreCreationDTO).save();
    return this.genreMapper.mapToDTO(savedGenre);
  }

  async existsByName(name: string): Promise<boolean> {
    return await this.genreModel.exists({ name: name });
  }
}
