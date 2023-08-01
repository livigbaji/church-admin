import { Controller, Get } from '@nestjs/common';
import states from '../data/states';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { State } from '../dtos/state.dto';

@ApiTags('Config')
@Controller('/api/configs')
export class ConfigsController {
  @ApiOkResponse({
    type: State,
  })
  @ApiOperation({
    summary: 'Return all states with their LGA',
  })
  @Get('/states')
  states() {
    return states;
  }
}
