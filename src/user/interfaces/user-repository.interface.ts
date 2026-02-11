export abstract class IUserRepository<T> {
  abstract create(createUserDto: Partial<T>): Promise<T>;
  abstract save(user: T): Promise<T>;
  abstract find(): Promise<T[]>;
  abstract findOneBy(criteria: Partial<T>): Promise<T|null>;
  abstract remove(user: T): Promise<T>;
}