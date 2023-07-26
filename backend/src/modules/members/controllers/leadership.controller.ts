import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LeadershipDTO, LeadershipResponse } from '../dtos/leadership.dto';
import { LeadershipService } from '../services/leadership.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Leadership } from '../models/leadership.model';

@ApiTags('Leadership')
@Controller('leadership')
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) {}

  @ApiCreatedResponse({
    type: Leadership,
  })
  @ApiOperation({
    summary: 'Make a member a leader (of the unit or a sub-unit)',
  })
  @Post('/')
  create(@Body() leadership: LeadershipDTO) {
    return this.leadershipService.create(leadership);
  }

  @ApiOperation({
    summary: 'List all users',
  })
  @ApiOkResponse({
    type: LeadershipResponse,
  })
  @ApiQuery({
    name: 'unit',
    required: false,
  })
  @Get('/')
  list(@Query('unit') unit: string) {
    return this.leadershipService.list(unit);
  }
}
