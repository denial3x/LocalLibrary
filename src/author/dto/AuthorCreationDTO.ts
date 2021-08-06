import { IsDate, IsDateString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class AuthorCreationDTO {
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string;

  @IsNotEmpty()
  @MaxLength(100)
  family_name: string;

  @IsOptional()
  @IsDateString()
  date_of_birth: Date;

  @IsOptional()
  @IsDateString()
  date_of_death: Date;
}
