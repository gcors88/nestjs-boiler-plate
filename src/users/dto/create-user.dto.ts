import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { SigninDto } from './signin.dto';
import { Roles } from 'src/commons/enums/roles';

export class CreateUserDto extends SigninDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isPasswordChange?: boolean;

  @IsArray()
  @IsEnum(Roles, { each: true })
  roles: Array<Roles>;
}
