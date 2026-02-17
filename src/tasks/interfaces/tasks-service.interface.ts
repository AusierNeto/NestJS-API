import { User } from 'src/user/entities/user.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

export abstract class ITasksService<Task> {
  abstract create(createTaskDTO: CreateTaskDto, user: User): Promise<Task>;
  abstract find(): Promise<Task[]>;
  abstract findBy(criteria: Partial<Task>): Promise<Task | null>;
  abstract update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task>;
  abstract removeTask(id: number, user: User): Promise<Task>;
  abstract findByUser(user: User): Promise<Task[] | null>;
}
