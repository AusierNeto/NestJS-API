import { IService } from 'src/common/interfaces/service.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUserService extends IService<User> {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract find(): Promise<User[]>;
  abstract findBy(criteria: Partial<User>): Promise<User | User[] | null>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: number, updateUserDto: CreateUserDto): Promise<User>;
  abstract remove(id: number): Promise<void>;
}
