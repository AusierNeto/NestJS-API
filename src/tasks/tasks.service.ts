import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) 
    private readonly repository: Repository<Task>
  ) {}
  
  async create(createTaskDto: CreateTaskDto) {
    const new_task = this.repository.create(createTaskDto);
    return await this.repository.save(new_task);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const found_task = await this.repository.findOneBy({ id });

    if (found_task) return found_task;
    else throw new NotFoundException();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate: Task = await this.findOne(id);
    Object.assign(taskToUpdate, updateTaskDto);
    await this.repository.save(taskToUpdate);
    return taskToUpdate;
  }

  async remove(id: number) {
    const taskToRemove = await this.findOne(id);
    await this.repository.remove(taskToRemove);
    return taskToRemove
  }
}
