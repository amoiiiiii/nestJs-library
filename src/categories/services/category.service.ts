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
import { Cron, CronExpression } from '@nestjs/schedule'; // Import scheduler decorator

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
      throw new InternalServerErrorException('Gagal membuat category');
    }
  }

  // Metode untuk mengambil semua categories
  async GetAllCategory(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      console.error('Error retrieving categories:', error);
      throw new InternalServerErrorException('Gagal mengambil categories');
    }
  }

  // Scheduler: Memanggil GetAllCategory setiap 5 detik
  @Cron(CronExpression.EVERY_5_SECONDS)
  async fetchCategoriesPeriodically() {
    console.log('Fetching categories periodically...');
    try {
      const categories = await this.GetAllCategory();
      console.log('Categories:', categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Metode untuk mengambil categories berdasarkan ID
  async GetCategoryById(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException(
          `Categories dengan ID ${id} tidak ditemukan`,
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
      console.error('Error updating category:', error);
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
      console.error('Error deleting category:', error);
      throw new InternalServerErrorException('Gagal menghapus categories');
    }
  }
}
