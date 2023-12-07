import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  private passwordSaltRounds: number;

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltRounds = Number(
      this.configService.get<number>('PASSWORD_SALT_ROUNDS'),
    );
  }

  public async create(createUserDto: CreateUserDto) {
    const validateUser = await this.userRepository.findOne(createUserDto.email);

    if (validateUser) {
      throw new BadRequestException('User already exists');
    }

    const user: CreateUserDto = {
      ...createUserDto,
      password: bcrypt.hashSync(
        createUserDto.password,
        this.passwordSaltRounds,
      ),
    };

    await this.userRepository.create(user);

    return {
      message: 'User created successfully',
    };
  }

  public async signin({ email, password }: SigninDto) {
    const user = await this.userRepository.findOne(email);

    this.validateIfExistsUser(user);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        name: '',
        message: 'Invalid credentials',
      });
    }

    const accessToken = await this.jwtService.signAsync({
      name: user.name,
      email: user.email,
    });

    return {
      name: user.name,
      accessToken: accessToken,
    };
  }

  private validateIfExistsUser(user: UserModel) {
    if (!user) throw new NotFoundException('User not found');
  }
}
