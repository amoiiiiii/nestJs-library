// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './categories/category.module';
import { BookModule } from './books/book.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthorModule,
    CategoryModule,
    BookModule,
  ],
})
export class AppModule {}
