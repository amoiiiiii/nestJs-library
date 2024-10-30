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
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto } from '../dtos/create-author.dto';
import { UpdateAuthorDto } from '../dtos/update-author.dto';
import { Author } from '../entities/author.entities';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // Endpoint untuk membuat author baru
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      return await this.authorService.createAuthor(createAuthorDto);
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk mendapatkan semua author
  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: 200,
    description: 'List of authors retrieved successfully.',
    type: [Author],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<Author[]> {
    try {
      return await this.authorService.GetAllAuthors();
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk mendapatkan author berdasarkan ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Author retrieved successfully.',
    type: Author,
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async findOne(@Param('id') id: string): Promise<Author> {
    try {
      return await this.authorService.GetAuthorById(+id);
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk memperbarui data author berdasarkan ID
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    try {
      return await this.authorService.updateAuthor(+id, updateAuthorDto);
    } catch (error) {
      throw error;
    }
  }

  // Endpoint untuk menghapus author berdasarkan ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Author deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.authorService.deleteAuthor(+id);
    } catch (error) {
      throw error;
    }
  }
}
