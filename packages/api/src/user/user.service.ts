import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO, CreateUserLoginDTO } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserInterface> {
    const newUser = createUserDTO;
    newUser.email = newUser.email.toLocaleLowerCase();

    const { email } = newUser;
    const foundEmail = await this.userModel.findOne({ email });
    if (foundEmail) throw new Error('El email ya existe');

    const saltOrRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltOrRounds);

    const user = new this.userModel(newUser);
    return await user.save();
  }

  async login(createUserLoginDTO: CreateUserLoginDTO): Promise<any> {
    const currentUser = createUserLoginDTO;

    const foundUser = await this.userModel.findOne({
      email: currentUser.email.toLowerCase(),
    });
    if (!foundUser) throw new NotFoundException('El usuario no existe');

    const passwordSuccess = await bcrypt.compare(
      currentUser.password,
      foundUser.password,
    );
    if (!passwordSuccess)
      throw new NotFoundException('Las credenciales no son válidas');

    const payload = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
    };

    return this.jwtService.sign(payload);
  }

  async updateUser(
    id: string,
    createUserDTO: CreateUserDTO,
  ): Promise<UserInterface> {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      id,
      createUserDTO,
      { new: true },
    );
    return userUpdated;
  }

  async deleteUser(id: string): Promise<UserInterface> {
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    return userDeleted;
  }

  async getUsers(): Promise<UserInterface[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<UserInterface> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
