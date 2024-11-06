// borrow.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entities';
import { BorrowService } from './services/borrow.service';
import { BorrowController } from './controllers/borrow.controller';
import { BookModule } from '../books/book.module'; // Pastikan path sesuai dengan folder kamu

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrow]),
    BookModule, // Import BookModule agar BookRepository tersedia
  ],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}
