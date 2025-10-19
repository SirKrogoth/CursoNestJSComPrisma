import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true, 
                email: true,
                Task: true,
            }
        });

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                passwordHash: createUserDto.passwordHash,
                email: createUserDto.email,
                createdAt: new Date(),
                }, 
                select: {
                    id: true,
                    name: true, 
                    email: true,
                }
            });

            return newUser;
        } catch (error) {
            throw new HttpException('Message: ' + error, HttpStatus.BAD_REQUEST);
        }        
    }
    
    async findAllUsers(){
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            
            return users;
        } catch (error) {
            throw new HttpException('Message: ' + error, HttpStatus.BAD_REQUEST);
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        try {
            const updateUser = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });

            return updateUser;
        } catch (error) {
          throw new HttpException('Message: ' + error, HttpStatus.BAD_REQUEST);   
        }
    }

    async removeUser(id: number) {
        try {
            await this.prisma.user.delete({
                where: { id },
            });

            return { message: 'Usuário deletado com sucesso.' };
        } catch (error) {
            throw new HttpException('Message: ' + error, HttpStatus.BAD_REQUEST);   
        }    
    }
}
