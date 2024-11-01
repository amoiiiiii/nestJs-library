// src/books/dtos/create-book.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  qty: number;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
