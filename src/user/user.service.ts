import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User) 
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.repository.create(createUserDto);
    return await this.repository.save(newUser);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const foundUser = await this.repository.findOneBy({id});
    if (foundUser) return foundUser;
    else throw new NotFoundException(); 
  }

  async findByEmail(email: string) {
    const foundUser = await this.repository.findOneBy({email});
    if (foundUser) return foundUser;
    else throw new NotFoundException();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate: User = await this.findOne(id);
    Object.assign(userToUpdate, updateUserDto);
    await this.repository.save(userToUpdate);
    return userToUpdate;
  }

  async remove(id: number) {
    const userToRemove: User = await this.findOne(id);
    await this.repository.remove(userToRemove);
    return userToRemove;
  }
}
