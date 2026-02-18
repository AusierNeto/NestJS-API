/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsEnum(TaskStatus, {
    message: 'Status inválido. Use: To Do, In Progress ou Done',
  })
  status: TaskStatus;

  @IsNumber()
  repository_id: number;
}
