import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UnitsService } from '../services/units.service';
import {
  UnitDTO,
  UnitDesignationDTO,
  UnitDesignationResponse,
  UnitResponse,
} from '../dtos/unit.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Unit } from '../models/unit.model';
import { Auth } from 'src/decorators/permissions.decorator';

@ApiTags('Unit')
@Controller('/api/units')
export class UnitsController {
  constructor(private readonly unitService: UnitsService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Unit,
  })
  @ApiOperation({
    summary: 'Create a unit',
  })
  @Auth()
  create(@Body() unit: UnitDTO) {
    return this.unitService.create(unit);
  }

  @Get('/')
  @ApiOkResponse({
    type: UnitResponse,
  })
  @ApiOperation({
    summary: 'Get all units',
  })
  @Auth()
  list() {
    return this.unitService.list();
  }

  @Get('/designations')
  @ApiOkResponse({
    type: UnitDesignationResponse,
  })
  @ApiOperation({
    summary: 'Get all designations',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @Auth()
  getDesignations(@Query('search') search?: string) {
    return this.unitService.getDesignations(search);
  }

  @Put('/:unit')
  @ApiOkResponse({
    type: Unit,
  })
  @ApiOperation({
    summary: 'Update unit details',
  })
  @Auth()
  updateUnit(@Param('unit') id: string, @Body() unit: UnitDTO) {
    return this.unitService.update(id, unit);
  }

  @Delete('/:unit/designations/:designation')
  @ApiOkResponse({
    type: Unit,
  })
  @ApiOperation({
    summary: 'Delete unit designation',
  })
  @Auth()
  deleteUnitDesignation(
    @Param('unit') unit: string,
    @Param('designation') designation: string,
  ) {
    return this.unitService.removeDesignation(unit, designation);
  }

  @Put('/:unit/designations/:designation')
  @ApiOkResponse({
    type: Unit,
  })
  @ApiOperation({
    summary: 'update unit designation',
  })
  @Auth()
  updateDesignation(
    @Param('unit') unit: string,
    @Param('designation') designationId: string,
    @Body() designation: UnitDesignationDTO,
  ) {
    return this.unitService.updateDesignation(unit, designationId, designation);
  }

  @Post('/:unit/designations')
  @ApiOkResponse({
    type: Unit,
  })
  @ApiOperation({
    summary: 'Create a unit designation',
  })
  @Auth()
  addDesignation(
    @Param('unit') unit: string,
    @Body() designation: UnitDesignationDTO,
  ) {
    return this.unitService.addDesignation(unit, designation);
  }
}
