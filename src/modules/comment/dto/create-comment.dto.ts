import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  taskId: number;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;
}
