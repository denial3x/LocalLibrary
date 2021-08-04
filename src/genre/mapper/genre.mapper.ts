import { GenreDTO } from "../dto/GenreDTO";
import { createSchema, morphism } from "morphism";
import { Injectable } from "@nestjs/common";
import { GenreDocument } from "../schema/genre.schema";

@Injectable()
export class GenreMapper {
  public mapToDTO(genre: GenreDocument): GenreDTO {
    const schema = createSchema<GenreDTO, GenreDocument>({ id: "_id", name: "name" });
    return morphism(schema, genre);
  }
}
