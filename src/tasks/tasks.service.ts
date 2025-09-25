import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class TasksService {

    findAll(): any[] {
        return [
            {
                id: 1,
                title: 'First Task',
                description: 'This is the first task',
                status: 'OPEN'
            },
            {
                id: 2,
                title: 'Second Task',
                description: 'This is the second task',
                status: 'OPEN'
            }
        ]
    }

    findOneTask(id: string) {
        return "Buscar tarefa do ID: " + id;
    }

    create(body) {
        return body
    }

    update(id: string, body) {
        console.log(id, body);
        return body;
    }

    remove(id: string) {
        console.log(id);
        return `Tarefa ${id} removida com sucesso!`;
    }
}
