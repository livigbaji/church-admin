import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnitsService } from '../services/units.service';
import { UnitDTO, UnitDesignationDTO } from '../dtos/unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitService: UnitsService) {}

  @Post('/')
  create(@Body() unit: UnitDTO) {
    return this.unitService.create(unit);
  }

  @Get('/')
  list() {
    return this.unitService.list();
  }

  @Put('/:unit')
  updateUnit(@Param('unit') id: string, @Body() unit: UnitDTO) {
    return this.unitService.update(id, unit);
  }

  @Delete('/:unit/designations/:designation')
  deleteUnitDesignation(
    @Param('unit') unit: string,
    @Param('designation') designation: string,
  ) {
    return this.unitService.removeDesignation(unit, designation);
  }

  @Put('/:unit/designations/:designation')
  updateDesignation(
    @Param('unit') unit: string,
    @Param('designation') designationId: string,
    @Body() designation: UnitDesignationDTO,
  ) {
    return this.unitService.updateDesignation(unit, designationId, designation);
  }

  @Post('/:unit/designations')
  addDesignation(
    @Param('unit') unit: string,
    @Body() designation: UnitDesignationDTO,
  ) {
    return this.unitService.addDesignation(unit, designation);
  }
}
