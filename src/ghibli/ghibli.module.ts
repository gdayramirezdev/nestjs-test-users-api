import { Module } from '@nestjs/common';
import { GhibliService } from './ghibli.service';
import { GhibliController } from './ghibli.controller';

@Module({
  providers: [GhibliService],
  controllers: [GhibliController]
})
export class GhibliModule { }
