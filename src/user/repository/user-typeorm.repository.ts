import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: Partial<User>): Promise<User> {
    const newUser = this.repository.create(createUserDto);
    return await this.save(newUser);
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async find(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOneBy(criteria: Partial<User>): Promise<User | null> {
    return await this.repository.findOneBy(criteria as FindOptionsWhere<User>);
  }

  async remove(user: User): Promise<User> {
    return await this.repository.remove(user);
  }
}
