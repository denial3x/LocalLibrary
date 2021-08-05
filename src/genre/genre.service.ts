import { Model, ObjectId } from "mongoose";
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
    const allGenres = await this.genreModel.find();
    return allGenres.map((genre) => this.genreMapper.mapToDTO(genre));
  }

  async getGenreById(id: ObjectId): Promise<GenreDTO> {
    return this.genreMapper.mapToDTO(await this.findGenreById(id));
  }

  async createGenre(genreCreationDTO: GenreCreationDTO): Promise<GenreDTO> {
    if (await this.existsByName(genreCreationDTO.name))
      throw new InternalServerErrorException(`Genre with name: '${genreCreationDTO.name}' already exists.`);

    const savedGenre = await new this.genreModel(genreCreationDTO).save();
    return this.genreMapper.mapToDTO(savedGenre);
  }

  async deleteGenreById(id: ObjectId): Promise<GenreDTO> {
    const genre = await this.findGenreById(id);
    genre.delete();
    return this.genreMapper.mapToDTO(genre);
  }

  private async findGenreById(id: ObjectId): Promise<GenreDocument> {
    const genre = await this.genreModel
      .findById(id)
      .orFail(new NotFoundException(`Genre with id: '${id}' not found.`));
    return genre;
  }

  private async existsByName(name: string): Promise<boolean> {
    return await this.genreModel.exists({ name: new RegExp(`^${name}$`, "i") });
  }
}
