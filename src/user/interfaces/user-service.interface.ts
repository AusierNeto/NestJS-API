import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: number, updateUserDto: CreateUserDto): Promise<User>;
  abstract remove(id: number): Promise<User>;
}
