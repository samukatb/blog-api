import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @MinLength(2)
  @IsString()
  fullname: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  about: string;
}
