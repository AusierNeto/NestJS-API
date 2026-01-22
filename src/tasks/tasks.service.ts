import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private database: Array<Task> = [];

  create(createTaskDto: CreateTaskDto) {
    const last_index: number = this.database.length
      ? this.database[this.database.length - 1].id + 1
      : 1;
    const new_task = new Task();

    new_task.id = last_index;
    new_task.responsible = createTaskDto.responsible;
    new_task.title = createTaskDto.title;
    new_task.repository_id = createTaskDto.repository_id;

    this.database.push(new_task);
    return new_task;
  }

  findAll() {
    return this.database;
  }

  findOne(id: number) {
    const found_task = this.database.find((e) => e.id === id);
    if (found_task) return found_task;
    else throw new NotFoundException();
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    const taskToRemove = this.findOne(id);
    const taskIndex = this.database.indexOf(taskToRemove);
    if (taskIndex != -1) {
      this.database.splice(taskIndex, 1);
    }
  }
}
