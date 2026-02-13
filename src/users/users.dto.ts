import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from './user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';


export class CreateUserDto {
  @ApiProperty({ description: 'name for user'})
  @IsString()
  name: string
  
  @ApiProperty({
    description: 'valid email example foo@bar.com'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'role for user',
    enum: ['admin', 'films', 'people', 'locations', 'species', 'vehicles']
  })
  @IsEnum(Role)
  role: Role

  @ApiProperty({
    description: 'minLength 8, minLowercase 1, minUppercase 1, minNumbers 1, minSymbols 1'
  })
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