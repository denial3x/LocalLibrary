import { IsNotEmpty, MaxLength } from "class-validator";

export class AuthorCreationDTO {
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string;

  @IsNotEmpty()
  @MaxLength(100)
  family_name: string;

  date_of_birth: Date;
  date_of_death: Date;
}
