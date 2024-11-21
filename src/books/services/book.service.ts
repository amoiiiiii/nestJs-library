import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entities';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>, // Injecting the repository for Book entity
  ) {}
  async createBook(
    createBookDto: CreateBookDto,
    userId: number,
  ): Promise<Book> {
    try {
      const book = this.bookRepository.create({
        title: createBookDto.title,
        authorId: createBookDto.authorId,
        categoryId: createBookDto.categoryId,
        qty: createBookDto.qty,
        createdBy: userId.toString(),
        image: createBookDto.image, // Pastikan menggunakan 'image' bukan 'images'
      });
      return await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // Method to get all books
  async getAllBooks(): Promise<Book[]> {
    try {
      // Retrieve all books with their relations
      return await this.bookRepository.find({
        relations: ['author', 'category'],
      });
    } catch (error) {
      console.error('Error retrieving books:', error);
      throw new InternalServerErrorException('Gagal mengambil buku');
    }
  }

  // Method to get a book by ID
  async getBookById(id: string): Promise<Book> {
    try {
      // Find the book by its ID, including relations
      const book = await this.bookRepository.findOne({
        where: { id },
        relations: ['author', 'category', 'user'],
      });
      if (!book) {
        throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) throw error; // Re-throw if it's a NotFoundException
      console.error('Error finding book:', error);
      throw new InternalServerErrorException('Gagal menemukan buku');
    }
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
    userId: number,
    newImagePath?: string,
  ): Promise<Book> {
    try {
      const existingBook = await this.getBookById(id);
      // Validasi bahwa user memiliki hak untuk memperbarui buku ini
      if (existingBook.createdBy !== userId.toString()) {
        throw new NotFoundException(
          'Anda tidak memiliki izin untuk memperbarui buku ini',
        );
      }
      // Hapus file gambar lama jika ada gambar baru
      if (newImagePath && existingBook.image) {
        const oldImagePath = path.resolve(existingBook.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Hapus file lama
        }
        updateBookDto.image = newImagePath; // Set path gambar baru
      }
      // Gabungkan data baru dengan data lama
      const updatedBook = {
        ...existingBook,
        ...updateBookDto,
        createdBy: existingBook.createdBy, // Pastikan kolom createdBy tetap sama
      };
      await this.bookRepository.save(updatedBook);
      return updatedBook;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error updating book:', error);
      throw new InternalServerErrorException('Gagal memperbarui buku');
    }
  }
  // Method to delete a book by ID
  async deleteBook(id: string): Promise<{ message: string }> {
    try {
      const book = await this.getBookById(id); // Retrieve the book to delete
      await this.bookRepository.remove(book); // Remove the book from the database
      return { message: 'Buku berhasil dihapus' }; // Return success message
    } catch (error) {
      if (error instanceof NotFoundException) throw error; // Re-throw if it's a NotFoundException
      console.error('Error deleting book:', error);
      throw new InternalServerErrorException('Gagal menghapus buku');
    }
  }
}
