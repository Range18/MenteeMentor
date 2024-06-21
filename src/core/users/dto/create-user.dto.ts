import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { PASSWORD_MINLENGTH } from '#src/core/users/user.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly surname?: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsStrongPassword({
    minLength: PASSWORD_MINLENGTH,
    minSymbols: 0,
    minLowercase: 0,
    minNumbers: 0,
    minUppercase: 0,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
