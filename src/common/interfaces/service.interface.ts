export abstract class IService<T> {
  abstract create(createEntityDTO: Partial<T>): Promise<T>;
  abstract find(): Promise<T[]>;
  abstract findOneBy(criteria: Partial<T>): Promise<T | null>;
  abstract update(id: number, updateEntityDTO: Partial<T>): Promise<T>;
  abstract remove(id: number): Promise<void>;
}
