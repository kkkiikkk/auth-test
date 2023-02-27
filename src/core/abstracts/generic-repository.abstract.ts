export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getBy(params: Partial<T>): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract deleteById(id: string): Promise<void>;
}
