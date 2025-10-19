import { Body, Controller, Delete, Get , Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':id')
    findAll(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.create(CreateUserDto);
    }

    @Get()
    findAllUsers() {
        return this.userService.findAllUsers();
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.removeUser(id);
    }
}