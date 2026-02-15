import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user-typeorm.repository';
import { IRepository } from 'src/common/interfaces/repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IRepository,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
