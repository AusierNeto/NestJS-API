import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { IRepository } from 'src/common/interfaces/repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IRepository)
    private readonly repository: IRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.repository.create(createUserDto);
    return await this.repository.save(newUser);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const foundUser = await this.repository.findOneBy({ id });
    if (foundUser) return foundUser;
    else throw new NotFoundException();
  }

  async findByEmail(email: string) {
    const foundUser = await this.repository.findOneBy({ email });
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
