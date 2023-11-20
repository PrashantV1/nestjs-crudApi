
  
import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  readonly username?: string;

  @IsEmail()
  readonly email?: string;

  @IsString()
  readonly state?: string;

  @IsNumber()
  readonly marks?: number;
}


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly state?: string;

  @IsNumber()
  @IsOptional()
  readonly marks?: number;
}