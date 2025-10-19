import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) {}

    async findAll(paginationDto?: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};
        const allTasks = await this.prisma.task.findMany({
            skip: offset,
            take: limit,
        });

        return allTasks;
    }

    async findOneTask(id: number) {
        const task = await this.prisma.task.findFirst({
            where: { id }
        });

        if (task?.name) {
            return task;
        }

        throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    async create(createTaskDto: CreateTaskDto) {
        try {
            const newTask = await this.prisma.task.create({
            data: {
                    name: createTaskDto.name,
                    description: createTaskDto.description, 
                    completed: false,
                    userId: createTaskDto.userId,
                }, select: {
                    id: true,
                    name: true,
                    description: true,
                    userId: true,
                }
            });

            return newTask;   
        } catch (error) {
            throw new HttpException('Erro ao criar a tarefa. Mensagem: ' + error, HttpStatus.BAD_REQUEST);   
        }        
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const findTask = await this.prisma.task.findFirst({
            where: { id: Number(id) }
        });

        if (!findTask?.name) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        const updatedTask = await this.prisma.task.update({
            where: { id: Number(id) },
            data: updateTaskDto
        });

        return updatedTask;
    }

    async remove(id: string) {
        try {
            const findTask = await this.prisma.task.findFirst({
                where: { id: Number(id) }
            });

            if (!findTask?.name) {
                throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
            }

            await this.prisma.task.delete({
                where: { id: Number(id) }
            });

            return { message: 'Tarefa deletada com sucesso!' };    
        } catch (error) {
            throw new HttpException('Erro ao deletar a tarefa. Mensagem: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);    
        }
        
    }
}
