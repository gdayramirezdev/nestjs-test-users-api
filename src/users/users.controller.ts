import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // for creating users an access_token is not required in POST /users
  @Post()
  @ApiOperation({ summary: 'Create new users' })
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  // for consuming data from data base is required an access_token
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiBearerAuth('bearer')
  async update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBearerAuth('bearer')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
