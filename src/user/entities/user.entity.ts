import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/entities/task.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  role: UserRole = UserRole.USER

  @OneToMany(() => Task, task => task.user)
  tasks: Task[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
