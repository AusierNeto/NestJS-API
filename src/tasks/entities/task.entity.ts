import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: TaskStatus = TaskStatus.TO_DO;

  @ManyToOne(() => User, user => user.tasks)
  user: User;

  @Column()
  repository_id: number;
}
