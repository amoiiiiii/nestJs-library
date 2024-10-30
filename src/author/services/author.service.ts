import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entities';
import { CreateAuthorDto } from '../dtos/create-author.dto';
import { UpdateAuthorDto } from '../dtos/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>, // Menginjeksi repository Author
  ) {}

  // Metode untuk membuat penulis baru
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      const author = this.authorRepository.create({
        name: createAuthorDto.name,
        bio: createAuthorDto.bio,
      });
      return await this.authorRepository.save(author);
    } catch (error) {
      console.error('Error creating author:', error);
      throw new InternalServerErrorException('Gagal membuat penulis');
    }
  }

  // Metode untuk mengambil semua penulis
  async GetAllAuthors(): Promise<Author[]> {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      console.error('Error retrieving authors:', error);
      throw new InternalServerErrorException('Gagal mengambil penulis');
    }
  }

  // Metode untuk mengambil penulis berdasarkan ID
  async GetAuthorById(id: number): Promise<Author> {
    try {
      const author = await this.authorRepository.findOne({ where: { id } });
      if (!author) {
        throw new NotFoundException(`Penulis dengan ID ${id} tidak ditemukan`);
      }
      return author;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error finding author:', error);
      throw new InternalServerErrorException('Gagal menemukan penulis');
    }
  }

  // Metode untuk memperbarui penulis berdasarkan ID
  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    try {
      const existingAuthor = await this.GetAuthorById(id);
      const updatedAuthor = { ...existingAuthor, ...updateAuthorDto };
      await this.authorRepository.save(updatedAuthor);
      return updatedAuthor;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error updating author:', error);
      throw new InternalServerErrorException('Gagal memperbarui penulis');
    }
  }

  // Metode untuk menghapus penulis berdasarkan ID
  async deleteAuthor(id: number): Promise<void> {
    try {
      const author = await this.GetAuthorById(id);
      await this.authorRepository.remove(author);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error deleting author:', error);
      throw new InternalServerErrorException('Gagal menghapus penulis');
    }
  }
}
