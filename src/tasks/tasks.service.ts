import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { ITasksService } from './interfaces/tasks-service.interface';
import { ITasksRepository } from './interfaces/tasks-repository.interface';

@Injectable()
export class TasksService extends ITasksService<Task> {
  constructor(
    @Inject(ITasksRepository)
    private readonly repository: ITasksRepository<Task>,
  ) {
    super();
  }

  async create(createTaskDto: CreateTaskDto, user: User) {
    const new_task = await this.repository.create({ ...createTaskDto, user });
    return await this.repository.save(new_task);
  }

  async find() {
    return await this.repository.find();
  }

  async findByUser(user: User) {
    return await this.repository.findAllByUser(user.id);
  }

  async findBy(criteria: Partial<Task>) {
    const foundTask = await this.repository.findBy(criteria);
    if (foundTask) return foundTask;
    else throw new NotFoundException();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const taskToUpdate: Task = await this.findBy({ id: id, user: user });
    Object.assign(taskToUpdate, updateTaskDto);
    await this.repository.save(taskToUpdate);
    return taskToUpdate;
  }

  async removeTask(id: number, user: User) {
    const taskToRemove = await this.findBy({ id: id, user: user });
    await this.repository.remove(taskToRemove);
    return taskToRemove;
  }

  async remove(id: number): Promise<void> {
    const taskToRemove = await this.findBy({ id: id });
    if (!taskToRemove) throw new NotFoundException();
    else throw new BadRequestException('Use removeTask method instead');
  }
}
