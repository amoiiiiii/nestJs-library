// src/borrows/dtos/update-borrow.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateBorrowDto {
  @IsOptional()
  @IsString()
  returnDate?: Date; // Optional return date
}
