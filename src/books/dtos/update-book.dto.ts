// update-book.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'Updated title of the book', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Updated author ID', required: false })
  @IsString()
  @IsOptional()
  authorId?: string;

  @ApiProperty({ description: 'Updated category ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'Updated quantity of books available',
    required: false,
  })
  @IsInt()
  @IsOptional()
  qty?: number;

  @ApiProperty({ description: 'User ID who updated the book', required: false })
  @IsString()
  @IsOptional()
  createdBy?: string;
}
