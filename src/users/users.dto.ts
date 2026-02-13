import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { Role } from './user.entity'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsStrongPassword } from 'class-validator'


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string
  
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsEnum(Role)
  role: Role

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}