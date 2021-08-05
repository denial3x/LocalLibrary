import { Injectable } from "@nestjs/common";
import { createSchema, morphism } from "morphism";
import { AuthorDocument } from "../schema/author.schema";
import { AuthorDTO } from "../dto/AuthorDTO";

@Injectable()
export class AuthorMapper {
  public mapToDTO(authorDocument: AuthorDocument): AuthorDTO {
    const schema = createSchema<AuthorDTO, AuthorDocument>({
      id: "_id",
      first_name: "first_name",
      family_name: "family_name",
      date_of_death: "date_of_death",
      date_of_birth: "date_of_birth",
    });

    return morphism(schema, authorDocument);
  }
}
