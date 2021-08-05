import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as mongoose from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(id: string, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid 'ObjectId'.");
    return mongoose.Types.ObjectId(id);
  }
}
