import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBorrowDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  borrowDate: Date;

  @IsDate()
  returnDate?: Date; // optional
}
