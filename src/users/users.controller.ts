import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';
import { SigninResponseDto } from 'src/users/dto/signin-response.dto';
import { RefreshTokenBodyDto } from 'src/users/dto/refresh-token-body.dto';
import { AuthGuard } from 'src/providers/auth/auth.guards';
import { Roles } from 'src/providers/auth/roles.decorator';
import { Roles as RolesEnum } from 'src/commons/enums/roles';
import { RolesGuard } from 'src/providers/auth/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles([RolesEnum.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/signin')
  public async findOne(@Body() body: SigninDto): Promise<SigninResponseDto> {
    return this.usersService.signin(body);
  }

  @Post('/refresh-token')
  public async refreshToken(
    @Body() { refreshToken }: RefreshTokenBodyDto,
  ): Promise<SigninResponseDto> {
    return this.usersService.refreshToken(refreshToken);
  }
}
