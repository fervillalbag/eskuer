import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateUserDTO, CreateUserLoginDTO } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserInterface> {
    const newUser = await this.userService.createUser(createUserDTO);

    if (Object.keys(newUser).length === 0) {
      throw new NotFoundException('User not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Created!',
      success: true,
      user: newUser,
    });
  }

  @Post('/login')
  async login(
    @Res() res,
    @Body() createUserLoginDTO: CreateUserLoginDTO,
  ): Promise<any> {
    const token = await this.userService.login(createUserLoginDTO);
    if (!token) {
      throw new NotFoundException('Login failed');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Login successfully',
      success: true,
      token,
    });
  }

  @Put('/:id')
  async updateUser(
    @Res() res,
    @Param('id') id: string,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserInterface> {
    const user = await this.userService.updateUser(id, createUserDTO);

    if (Object.keys(user).length === 0) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Updated!',
      success: true,
      user,
    });
  }

  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id: string) {
    const user = await this.userService.deleteUser(id);

    if (Object.keys(user).length === 0) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Deleted!',
      success: true,
      user,
    });
  }

  @Get('/')
  async getUsers(@Res() res): Promise<UserInterface[]> {
    const users = await this.userService.getUsers();

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Users fetched!',
      success: true,
      users,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id: string): Promise<UserInterface> {
    const user = await this.userService.getUser(id);

    if (Object.keys(user).length === 0 || !user) {
      throw new NotFoundException('User not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'User fetched!',
      success: true,
      user,
    });
  }
}
