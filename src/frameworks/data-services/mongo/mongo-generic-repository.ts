import { Model } from "mongoose";
import { IGenericRepository } from "../../../core";

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populate: string[];

  constructor(repository: Model<T>, populate: string[]) {
    this._repository = repository;
    this._populate = populate;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populate).exec();
  }

  getById(id: string): Promise<T> {
    return this._repository.findById(id).exec();
  }

  getBy(params: Partial<T>): Promise<T> {
    return this._repository.findOne(params).exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }

  async deleteById(id: string): Promise<void> {
    await this._repository.findByIdAndDelete(id);
  }
}
