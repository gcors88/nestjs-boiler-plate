import { IsArray, IsEnum, IsString } from 'class-validator';
import { Roles } from 'src/commons/enums/roles';

export class SigninResponseDto {
  @IsString()
  name: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsArray()
  @IsEnum(Roles, { each: true })
  roles: Array<Roles>;
}
