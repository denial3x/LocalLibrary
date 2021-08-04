import { IsMongoId } from "class-validator";

export class MongoObjectId {
  @IsMongoId()
  id: string;
}
