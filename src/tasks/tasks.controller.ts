import { Body, Controller, Delete, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { Get, Post, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller("tasks")
@UseInterceptors(LoggerInterceptor)
export class TasksController {

    constructor(private readonly tasksService: TasksService) {

    }

    @Get()
    @UseInterceptors(LoggerInterceptor)
    @UseInterceptors(AddHeaderInterceptor)
    findAll(@Query() PaginationDto: PaginationDto) {
        return this.tasksService.findAll(PaginationDto);
    }

    @Get(":id")
    findOneTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.findOneTask(id);
    }

    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor)
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