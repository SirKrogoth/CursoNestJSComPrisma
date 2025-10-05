import { Body, Controller, Delete, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller("tasks")
export class TasksController {

    constructor(private readonly tasksService: TasksService) {

    }

    @Get()
    findAll(): any[] {
        return this.tasksService.findAll();
    }

    @Get(":id")
    findOneTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.findOneTask(id);
    }

    @Post()
    create(@Body() CreateTaskDto: CreateTaskDto) {
        return this.tasksService.create(CreateTaskDto);
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() UpdateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, UpdateTaskDto);
    }

    @Delete(":id")
    removeTask(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}