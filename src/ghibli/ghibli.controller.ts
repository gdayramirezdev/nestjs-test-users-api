import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GhibliService } from './ghibli.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../common/guards/roles.guard';
import { Role } from 'src/users/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ghibli')
@ApiTags('Ghibli')
export class GhibliController {
  constructor(private readonly ghibliService: GhibliService) { }

  @Get(':category')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get category from ghibli API' })
  @ApiBearerAuth()
  async getByCategory(@Param('category') category: string) {
    return this.ghibliService.getByRole(category as Role);
  }
}