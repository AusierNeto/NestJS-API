import { Task } from 'src/tasks/entities/task.entity';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  tasks: Array<Task> = new Array<Task>();
}
