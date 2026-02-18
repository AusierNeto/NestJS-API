import { IRepository } from '../../common/interfaces/repository.interface';

export abstract class ITasksRepository<Task> extends IRepository<Task> {
  abstract create(createEntityDTO: Partial<Task>): Promise<Task>;
  abstract save(entity: Task): Promise<Task>;
  abstract find(): Promise<Task[]>;
  abstract findBy(criteria: Partial<Task>): Promise<Task | null>;
  abstract findAllByUser(userId: number): Promise<Task[] | null>;
  abstract remove(entity: Task): Promise<Task>;
}
