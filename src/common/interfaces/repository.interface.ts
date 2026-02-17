export abstract class IRepository<T> {
  abstract create(createEntityDTO: Partial<T>): Promise<T>;
  abstract save(entity: T): Promise<T>;
  abstract find(): Promise<T[]>;
  abstract findBy(criteria: Partial<T>): Promise<T | null>;
  abstract remove(entity: T): Promise<T>;
}
