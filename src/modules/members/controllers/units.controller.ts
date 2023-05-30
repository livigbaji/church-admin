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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Unit } from '../models/unit.model';

@ApiTags('Unit')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitService: UnitsService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Unit,
  })
  create(@Body() unit: UnitDTO) {
    return this.unitService.create(unit);
  }

  @Get('/')
  @ApiOkResponse({
    type: UnitResponse,
  })
  list() {
    return this.unitService.list();
  }

  @Get('/designations')
  @ApiOkResponse({
    type: UnitDesignationResponse,
  })
  getDesignations(@Query('search') search: string) {
    return this.unitService.getDesignations(search);
  }

  @Put('/:unit')
  @ApiOkResponse({
    type: Unit,
  })
  updateUnit(@Param('unit') id: string, @Body() unit: UnitDTO) {
    return this.unitService.update(id, unit);
  }

  @Delete('/:unit/designations/:designation')
  @ApiOkResponse({
    type: Unit,
  })
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
  addDesignation(
    @Param('unit') unit: string,
    @Body() designation: UnitDesignationDTO,
  ) {
    return this.unitService.addDesignation(unit, designation);
  }
}
