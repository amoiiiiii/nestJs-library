import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entities';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // Menginjeksi repository Category
  ) {}

  // Metode untuk membuat categories baru
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const category = this.categoryRepository.create({
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('membuat category');
    }
  }

  // Metode untuk mengambil semua categories
  async GetAllCategory(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      console.error('Error retrieving authors:', error);
      throw new InternalServerErrorException('Gagal mengambil categories');
    }
  }

  // Metode untuk mengambil categories berdasarkan ID
  async GetCategoryById(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException(
          `categories dengan ID ${id} tidak ditemukan`,
        );
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error finding category:', error);
      throw new InternalServerErrorException('Gagal menemukan categories');
    }
  }

  // Metode untuk memperbarui categories berdasarkan ID
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const existingCategory = await this.GetCategoryById(id);
      const updatedCategory = { ...existingCategory, ...updateCategoryDto };
      await this.categoryRepository.save(updatedCategory);
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error updating author:', error);
      throw new InternalServerErrorException('Gagal memperbarui categories');
    }
  }

  // Metode untuk menghapus categories berdasarkan ID
  async deleteCategory(id: number): Promise<void> {
    try {
      const category = await this.GetCategoryById(id);
      await this.categoryRepository.remove(category);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error deleting author:', error);
      throw new InternalServerErrorException('Gagal menghapus categories');
    }
  }
}
