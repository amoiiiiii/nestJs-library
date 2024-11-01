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
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { Book } from '../entities/book.entity';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() createAuthorDto: CreateBookDto): Promise<Book> {
    try {
      return await this.bookService.createBook(createAuthorDto);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  @ApiOperation({ summary: 'Get all books' })
  async findAll(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  async findOne(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book by ID' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book by ID' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.bookService.deleteBook(id);
  }
}
