import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Name of the author' })
  @IsString()
  @IsNotEmpty() // Validasi bahwa name tidak boleh kosong
  name: string;

  @ApiProperty({ description: 'Biography of the author' })
  @IsString()
  bio: string;
}
