import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty({ description: 'Updated name of the author' })
  @IsString() // Validasi bahwa name harus berupa string
  @IsNotEmpty() // Validasi bahwa name tidak boleh kosong
  name: string;
  @ApiProperty({ description: 'Biography of the author' })
  @IsString()
  bio: string;
}
