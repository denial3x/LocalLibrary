import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { AuthorMapper } from "./mapper/author-mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { Author, AuthorSchema } from "./schema/author.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorMapper], // Can be Injected in other classes.
  exports: [AuthorService], // Can be used in other modules.
})
export class AuthorModule {}
