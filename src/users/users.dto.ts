import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { Role } from './user.entity'
import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsEnum(Role)
  role: Role

  @IsString()
  @MinLength(6)
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}