import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    return this.tasksService.update(+id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(+id, req.user);
  }
}
