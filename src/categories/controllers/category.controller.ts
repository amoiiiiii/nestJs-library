import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../user/jwt-auth.guard';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../entities/category.entities';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  // Endpoint untuk membuat Category baru
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new categories' })
  @ApiResponse({
    status: 201,
    description: 'The Category has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.categoryService.createCategory(createCategoryDto);
    } catch (error) {
      throw error;
    }
  }
  // Endpoint untuk mendapatkan semua Category
  @Get()
  @ApiOperation({ summary: 'Get all Categorys' })
  @ApiResponse({
    status: 200,
    description: 'List of Categorys retrieved successfully.',
    type: [Category],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryService.GetAllCategory();
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk mendapatkan Category berdasarkan ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an Category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully.',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: string): Promise<Category> {
    try {
      return await this.categoryService.GetCategoryById(+id);
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk memperbarui data Category berdasarkan ID
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an Category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.categoryService.updateCategory(+id, updateCategoryDto);
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk menghapus Category berdasarkan ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an Category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.categoryService.deleteCategory(+id);
    } catch (error) {
      throw error;
    }
  }
}
