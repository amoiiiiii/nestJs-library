import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  @IsString()
  @IsNotEmpty() // Validasi bahwa name tidak boleh kosong
  name: string;

  @ApiProperty({ description: 'description of the category.' })
  @IsString()
  description: string;
}
