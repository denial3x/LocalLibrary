import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { GenreModule } from "./genre/genre.module";
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`),
    GenreModule,
    AuthorModule,
  ],
})
export class AppModule {}
