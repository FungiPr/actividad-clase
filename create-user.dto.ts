// src/user/dto/create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @Type(() => Number)
  @IsNumber()
  weight: number;

  @Type(() => Number)
  @IsNumber()
  height: number;
}
