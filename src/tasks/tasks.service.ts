import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class TasksService {
    getTasks(): any[] {
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


    findOneTask(): any[] {
        return[{
            id: 2,
                title: 'Second Task',
                description: 'This is the second task',
                status: 'OPEN'
        }];
    }
}
