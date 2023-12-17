import { DataSource, EntityTarget, Repository } from 'typeorm';

export interface Connection {
  getRepository<T>(model: EntityTarget<T>): Repository<T>;
  createConnection(): Promise<DataSource>;
  closeConnection(): Promise<void>;
}
