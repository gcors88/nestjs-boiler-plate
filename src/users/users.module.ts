import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { Database } from 'src/providers/database/postgres/database';
import { AuthGuard } from 'src/providers/auth/auth.guards';
import { RolesGuard } from 'src/providers/auth/roles.guards';

const userProviders = [
  Database,
  UsersService,
  UsersRepository,
  AuthGuard,
  RolesGuard,
];

@Module({
  controllers: [UsersController],
  providers: userProviders,
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${config.get<number>('SECONDS_TO_EXPIRE_TOKEN')}s`,
        },
      }),
    }),
  ],
})
export class UsersModule {}
