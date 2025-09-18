import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {

    constructor(private readonly tasksService: TasksService) {

    }

    @Get("/tasks")
    getTasks(): any[] {
        return this.tasksService.getTasks();
    }

    @Get("/task")
    getOneTask(): any[] {
        return this.tasksService.findOneTask();
    }
}