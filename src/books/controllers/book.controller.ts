import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Get,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../user/jwt-auth.guard'; // Pastikan JwtAuthGuard ada di path yang benar
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { Book } from '../entities/book.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const timestap = Date.now();
          const ext = file.originalname.split('.').pop();
          cb(null, `image-${timestap}.${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Book> {
    if (file) {
      createBookDto.image = file.path;
    }
    const userId: number = Number(req.user.userId);
    return this.bookService.createBook(createBookDto, userId);
  }
  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'List of all books retrieved successfully.',
    type: [Book],
  })
  async findAll(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Book found successfully.',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book with optional image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const timestamp = Date.now();
          const ext = file.originalname.split('.').pop();
          cb(null, `image-${timestamp}.${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Book> {
    const userId: number = Number(req.user.userId); // Ambil user ID dari token
    const newImagePath = file ? file.path : null;
    return this.bookService.updateBook(id, updateBookDto, userId, newImagePath);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.bookService.deleteBook(id);
    return { message: 'Book deleted successfully' };
  }
}
