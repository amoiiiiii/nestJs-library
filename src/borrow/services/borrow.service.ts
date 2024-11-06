import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from '../entities/borrow.entities';
import { Book } from '../../books/entities/book.entities';
import { CreateBorrowDto } from '../dtos/create-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowRepository: Repository<Borrow>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Metode untuk membuat peminjaman baru
  async createBorrow(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    try {
      const { userId, bookId, borrowDate, returnDate } = createBorrowDto;

      // Mendapatkan buku untuk memeriksa jumlah qty
      const book = await this.bookRepository.findOne({ where: { id: bookId } });

      if (!book) {
        throw new NotFoundException(`Buku dengan ID ${bookId} tidak ditemukan`);
      }

      // Validasi qty buku
      if (book.qty <= 0) {
        throw new InternalServerErrorException(
          `Stok buku habis, tidak bisa dipinjam`,
        );
      }

      // Mengurangi qty buku
      book.qty -= 1;
      await this.bookRepository.save(book);

      // Membuat data peminjaman
      const borrow = this.borrowRepository.create({
        userId,
        bookId,
        borrowDate,
        returnDate,
      });
      return await this.borrowRepository.save(borrow);
    } catch (error) {
      console.error('Error creating borrow:', error);
      throw new InternalServerErrorException('Gagal membuat peminjaman');
    }
  }

  // Metode untuk mengembalikan buku
  async returnBorrow(borrowId: number): Promise<Borrow> {
    try {
      const borrow = await this.borrowRepository.findOne({
        where: { id: borrowId },
        relations: ['book'],
      });

      if (!borrow) {
        throw new NotFoundException(
          `Peminjaman dengan ID ${borrowId} tidak ditemukan`,
        );
      }

      // Menambah qty buku karena dikembalikan
      const book = borrow.book;
      book.qty += 1;
      await this.bookRepository.save(book);

      // Menghapus data peminjaman jika perlu, atau tambahkan logika lain sesuai kebutuhan
      await this.borrowRepository.remove(borrow);

      return borrow;
    } catch (error) {
      console.error('Error returning borrow:', error);
      throw new InternalServerErrorException('Gagal mengembalikan peminjaman');
    }
  }
  async getAllBorrows(): Promise<Borrow[]> {
    try {
      // Mengambil semua peminjaman dengan relasi yang diperlukan
      return await this.borrowRepository.find({
        relations: ['user', 'book'],
      });
    } catch (error) {
      console.error('Error retrieving borrows:', error);
      throw new InternalServerErrorException('Gagal mengambil peminjaman');
    }
  }
}
