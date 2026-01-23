import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  responsible: string;

  @Column()
  repository_id: number;
}
