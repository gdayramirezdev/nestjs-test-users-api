import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'foo@bar.com'})
  email: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6})
  password: string
}
