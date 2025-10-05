import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id: 1,
            name: "First Task",
            description: "So sei que nada sei, e amanha saberei mais sobre nada...",
            completed: false
        },
        {
            id: 2,
            name: "Second Task",
            description: "Levar os dogs para passear",
            completed: false
        },
        {
            id: 3,
            name: "Third Task",
            description: "Levar o Nícolas na aula de natação",
            completed: false
        }
    ];

    findAll(): any[] {
        return this.tasks;
    }

    findOneTask(id: number) {
        const task = this.tasks.find(task => task.id === id);

        if (task) {
            return task;
        }

        throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    create(createTaskDto: CreateTaskDto) {
        const newId = this.tasks.length + 1;

        const newTask = {
            id: newId,
            ...createTaskDto,
            completed: false
        }

        this.tasks.push(newTask);

        return newTask;
    }

    update(id: string, updateTaskDto: UpdateTaskDto) {
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

        if(taskIndex < 0) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updateTaskDto
        }

        return this.tasks[taskIndex];
    }

    remove(id: string) {
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

        if(taskIndex < 0) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        this.tasks.splice(taskIndex, 1);
       
        return this.findAll();
    }
}
