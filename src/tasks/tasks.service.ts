import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ITasksService } from './interfaces/tasks-service.interface';
import { ITasksRepository } from './interfaces/tasks-repository.interface';

@Injectable()
export class TasksService extends ITasksService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly repository: ITasksRepository<Task>,
  ) {
    super();
  }

  async create(createTaskDto: CreateTaskDto, user: User) {
    const new_task = await this.repository.create({ ...createTaskDto, user });
    return await this.repository.save(new_task);
  }

  async findAll(user: User) {
    return await this.repository.findOneBy({ user: user });
  }

  async findOneBy(criteria: Partial<Task>) {
    const foundTask = await this.repository.findOneBy(criteria);
    if (foundTask) return foundTask;
    else throw new NotFoundException();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate: Task = await this.findOneBy({ id: id });
    Object.assign(taskToUpdate, updateTaskDto);
    await this.repository.save(taskToUpdate);
    return taskToUpdate;
  }

  async removeTask(id: number, user: User) {
    const taskToRemove = await this.findOneBy({ id: id, user: user });
    await this.repository.remove(taskToRemove);
    return taskToRemove;
  }

  async remove(id: number): Promise<void> {
    const taskToRemove = await this.findOneBy({ id: id });
    if (!taskToRemove) throw new NotFoundException();
    else throw new BadRequestException('Use removeTask method instead');
  }
}
