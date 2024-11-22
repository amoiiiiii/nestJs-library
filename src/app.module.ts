import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSourceOptions } from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './categories/category.module';
import { BookModule } from './books/book.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MulterModule.register({
      dest: './uploads',
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthorModule,
    CategoryModule,
    BookModule,
    BorrowModule,
  ],
})
export class AppModule {}
