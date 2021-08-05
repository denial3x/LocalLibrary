import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Author, AuthorDocument } from "./schema/author.schema";
import { AuthorMapper } from "./mapper/author-mapper";
import { AuthorDTO } from "./dto/AuthorDTO";
import { AuthorCreationDTO } from "./dto/AuthorCreationDTO";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private readonly authorMapper: AuthorMapper,
  ) {}

  async getAllAuthors(): Promise<AuthorDTO[]> {
    const authors = await this.authorModel.find();
    return authors.map((author) => this.authorMapper.mapToDTO(author));
  }

  async getAuthorById(id: ObjectId): Promise<AuthorDTO> {
    const author = await this.findAuthorById(id);
    return this.authorMapper.mapToDTO(author);
  }

  async createAuthor(authorCreationDTO: AuthorCreationDTO) {
    const firstName = authorCreationDTO.first_name.trim();
    const familyName = authorCreationDTO.family_name.trim();

    if (await this.existsByFirstAndFamilyNames(firstName, familyName))
      throw new InternalServerErrorException(`Author '${firstName} ${familyName}' already exists.`);

    const savedAuthor = await new this.authorModel(authorCreationDTO).save();

    return this.authorMapper.mapToDTO(savedAuthor);
  }

  async deleteAuthorById(id: ObjectId): Promise<AuthorDTO> {
    const author = await this.findAuthorById(id);
    author.delete();
    return this.authorMapper.mapToDTO(author);
  }

  private async findAuthorById(id: ObjectId): Promise<AuthorDocument> {
    return this.authorModel.findById(id).orFail(new NotFoundException(`Author with id: '${id}' not found.`));
  }

  private async existsByFirstAndFamilyNames(firstName: string, familyName: string): Promise<boolean> {
    return await this.authorModel.exists({
      first_name: new RegExp(`^${firstName}$`, "i"),
      family_name: new RegExp(`^${familyName}$`, "i"),
    });
  }
}
