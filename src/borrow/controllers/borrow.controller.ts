import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BorrowService } from '../services/borrow.service';
import { CreateBorrowDto } from '../dtos/create-borrow.dto';
import { Borrow } from '../entities/borrow.entities';

@ApiTags('Borrows') // Menambahkan tag 'Borrows' di Swagger
// @ApiBearerAuth() // Menambahkan Bearer Auth di Swagger
@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  // Endpoint untuk membuat data peminjaman baru
  @Post()
  @ApiOperation({ summary: 'Create a new borrow record' }) // Deskripsi endpoint di Swagger
  async create(@Body() createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    return await this.borrowService.createBorrow(createBorrowDto);
  }

  // Endpoint untuk mengembalikan buku yang dipinjam
  @Post(':id/return')
  @ApiOperation({ summary: 'Return a borrowed book' }) // Deskripsi endpoint di Swagger
  async returnBorrow(@Param('id') id: number): Promise<Borrow> {
    return await this.borrowService.returnBorrow(id);
  }

  // Endpoint untuk mendapatkan semua data peminjaman
  @Get()
  @ApiOperation({ summary: 'Get all borrow records' }) // Deskripsi endpoint di Swagger
  async findAll(): Promise<Borrow[]> {
    return await this.borrowService.getAllBorrows();
  }
}
