import { Body, Controller, Delete } from '@nestjs/common';
import { Get, Post, Param, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller("tasks")
export class TasksController {

    constructor(private readonly tasksService: TasksService) {

    }

    @Get()
    findAll(): any[] {
        return this.tasksService.findAll();
    }

    @Get(":id")
    findOneTask(@Param('id') id: string) {
        return this.tasksService.findOneTask(id);
    }

    @Post()
    create(@Body() body) {
        return this.tasksService.create(body);
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() body) {
        return this.tasksService.update(id, body);
    }

    @Delete(":id")
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}