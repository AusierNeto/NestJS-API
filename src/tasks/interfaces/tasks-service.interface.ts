import { IService } from 'src/common/interfaces/service.interface';
import { User } from 'src/user/entities/user.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export abstract class ITasksService<Task> extends IService<Task> {
  abstract create(createEntityDTO: Partial<Task>): Promise<Task>;
  abstract find(): Promise<Task[]>;
  abstract findOneBy(criteria: Partial<Task>): Promise<Task | null>;
  abstract update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
  abstract removeTask(id: number, user: User): Promise<Task>;
  abstract findAll(user: User): Promise<Task[] | null>;
}
