import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewAdminDTO, NewAdminResponse } from '../dtos/admin.dto';
import { AdminService } from '../services/admin.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Admin } from '../models/admin.model';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create new login access MFA',
  })
  @ApiCreatedResponse({
    type: NewAdminResponse,
  })
  add(@Body() newAdmin: NewAdminDTO) {
    return this.adminService.generate(newAdmin);
  }

  @Get('/')
  @ApiOperation({
    summary: 'List all active members with login access',
  })
  list() {
    return this.adminService.listAdmins();
  }

  @Delete('/:admin')
  @ApiOkResponse({
    type: Admin,
  })
  @ApiOperation({
    summary: 'Deactivate admin login access',
  })
  deactivate(@Param('admin') admin: string) {
    return this.adminService.deactivate(admin);
  }
}
