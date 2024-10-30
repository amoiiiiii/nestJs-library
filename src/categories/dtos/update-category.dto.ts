import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Updated name of the category' })
  @IsString() // Validasi bahwa name harus berupa string
  @IsNotEmpty() // Validasi bahwa name tidak boleh kosong
  name: string;
  @ApiProperty({ description: 'description of the category' })
  @IsString()
  description: string;
}
