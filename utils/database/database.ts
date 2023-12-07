import { PoolConfig, Pool } from 'pg';

const config: PoolConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
};

const connection = new Pool(config);
const database = process.env.POSTGRES_DATABASE;

export const createDb = async () => {
  connection.query(`CREATE DATABASE ${database};`).catch((err) => {
    throw new Error(err);
  });
};

export const dropDb = async () => {
  connection.query(`DROP DATABASE ${database};`).catch((err) => {
    throw new Error(err);
  });
};
