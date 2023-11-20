
import { Controller, Get, Post, Param, Body, Put, Delete, Query,ValidationPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto ,UpdateUserDto} from './dto/user.dto';
import { User} from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: UserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queryParams: any): Promise<User[]| {error:string}> {
    return this.usersService.findAll(queryParams);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<User | { error?: string }> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):  Promise<{ success?: string; error?: string }>{
    return this.usersService.remove(+id);
  }
}
