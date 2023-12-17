import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Database } from 'src/providers/database/postgres/database';
import { Connection } from 'src/providers/database/postgres/interfaces/connection';

@Injectable()
export class UsersRepository {
  private repository: Repository<UserModel>;
  constructor(
    @Inject(Database)
    private readonly database: Connection,
  ) {
    this.repository = this.database.getRepository(UserModel);
  }

  public async create(user: CreateUserDto): Promise<UserModel> {
    return this.repository.save(user);
  }

  public async findOne(email: string): Promise<UserModel> {
    return this.repository.findOneBy({ email });
  }

  public async findById(userId: number): Promise<UserModel> {
    return this.repository.findOneBy({
      id: userId,
    });
  }
}
