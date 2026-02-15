import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { IRepository } from 'src/common/interfaces/repository.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: IRepository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const new_task = await this.repository.create({ ...createTaskDto, user });
    return await this.repository.save(new_task);
  }

  async findAll(user: User) {
    return await this.repository.findOneBy({ user: user });
  }

  async findOne(id: number, user: User) {
    const found_task = await this.repository.findOneBy({ id: id, user: user });

    if (found_task) return found_task;
    else throw new NotFoundException();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const taskToUpdate: Task = await this.findOne(id, user);
    Object.assign(taskToUpdate, updateTaskDto);
    await this.repository.save(taskToUpdate);
    return taskToUpdate;
  }

  async remove(id: number, user: User) {
    const taskToRemove = await this.findOne(id, user);
    await this.repository.remove(taskToRemove);
    return taskToRemove;
  }
}
