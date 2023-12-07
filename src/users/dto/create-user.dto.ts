import { IsString } from 'class-validator';
import { SigninDto } from './signin.dto';

export class CreateUserDto extends SigninDto {
  @IsString()
  name: string;
}
