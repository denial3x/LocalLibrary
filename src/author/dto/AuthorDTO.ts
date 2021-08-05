import { ObjectId } from "mongoose";

export class AuthorDTO {
  id: ObjectId;
  first_name: string;
  family_name: string;
  date_of_birth: Date;
  date_of_death: Date;
}
