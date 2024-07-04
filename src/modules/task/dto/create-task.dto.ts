import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Matches } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['todo', 'inprogress', 'done'])
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Due Date must be in the format YYYY-MM-DD',
  })
  dueDate: string;
}
