import { Injectable } from '@nestjs/common';
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
    this.database.forEach((e) => (e.title, e.status, e.responsible));
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
