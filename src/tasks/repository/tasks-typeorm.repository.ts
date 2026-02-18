import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ITasksRepository } from '../interfaces/tasks-repository.interface';

@Injectable()
export class TaskRepository implements ITasksRepository<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(createTaskDto: Partial<Task>): Promise<Task> {
    console.log(createTaskDto);
    const newTask = this.repository.create(createTaskDto);
    return await this.save(newTask);
  }

  async save(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async find(): Promise<Task[]> {
    return await this.repository.find();
  }

  async findBy(criteria: Partial<Task>): Promise<Task | null> {
    return await this.repository.findOneBy(criteria as FindOptionsWhere<Task>);
  }

  async findAllByUser(userId: number): Promise<Task[] | null> {
    return await this.repository.findBy({
      user: { id: userId },
    } as FindOptionsWhere<Task>);
  }

  async remove(task: Task): Promise<Task> {
    return await this.repository.remove(task);
  }
}
