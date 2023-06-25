import { Body, Controller, Query } from '@nestjs/common';
import { LeadershipDTO, LeadershipResponse } from '../dtos/leadership.dto';
import { LeadershipService } from '../services/leadership.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
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
  create(@Body() leadership: LeadershipDTO) {
    return this.leadershipService.create(leadership);
  }

  @ApiOperation({
    summary: 'List all users',
  })
  @ApiOkResponse({
    type: LeadershipResponse,
  })
  list(@Query('unit') unit: string) {
    return this.leadershipService.list(unit);
  }
}
