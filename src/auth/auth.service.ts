import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    // There is not that email in data base
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Wrong credentials password in token !== database password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User): Promise<{
    access_token: string,
  }> {
    try {
      const payload = { sub: user.id, role: user.role };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (ex) {
      throw new InternalServerErrorException('Service Login Error');
    }
    
  }
}
