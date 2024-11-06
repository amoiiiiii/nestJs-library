import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entities';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
  exports: [TypeOrmModule],
})
export class BookModule {}
