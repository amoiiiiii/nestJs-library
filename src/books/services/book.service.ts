import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>, // Injecting the repository for Book entity
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create({
        title: createBookDto.title,
        authorId: createBookDto.authorId,
        categoryId: createBookDto.categoryId,
        qty: createBookDto.qty,
        createdBy: createBookDto.createdBy,
      });
      return await this.bookRepository.save(book);
    } catch (error) {
      console.error('Error creating author:', error);
      throw new InternalServerErrorException('Gagal membuat buku');
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

  // Method to update a book by ID
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const existingBook = await this.getBookById(id); // Retrieve the existing book
      const updatedBook = { ...existingBook, ...updateBookDto }; // Merge existing book data with new data
      await this.bookRepository.save(updatedBook); // Save the updated book
      return updatedBook; // Return the updated book instance
    } catch (error) {
      if (error instanceof NotFoundException) throw error; // Re-throw if it's a NotFoundException
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
