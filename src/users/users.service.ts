import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const exists = await this.userModel.findOne({ where: { email: data.email } })
    if (exists) {
      throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userModel.create({
      ...data,
      password: hashedPassword,
    });
    return this.userModel.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id } });
    return plainToInstance(User, user); // forzar el no mostrar contraseña desde entity 
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    await this.userModel.update(id, data); // forzar el no mostrar contraseña desde entity
  }

  async delete(id: string): Promise<void>  {
    await this.userModel.delete(id);
  }

  async findByEmail(email: string) : Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }
}
