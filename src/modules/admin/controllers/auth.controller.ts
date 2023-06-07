import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AdminList, NewAuthDTO } from '../dtos/auth.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Login a member with login(admin) access',
  })
  start(
    @Body() newAuth: NewAuthDTO,
    @Ip() ip: string,
    @Headers('User-Agent') device: string,
  ) {
    return this.authService.start(newAuth, ip, device);
  }

  @Delete('/:session')
  @ApiOperation({
    summary: 'Closes or invalidates a member login access',
  })
  invalidate(@Param('session') session: string) {
    return this.authService.invalidate(session);
  }

  @Get('/history')
  @ApiOkResponse({
    type: AdminList,
  })
  @ApiOperation({
    summary: 'Get admin login history',
  })
  history() {
    return this.authService.history();
  }

  @Get('/')
  @ApiOkResponse({
    type: AdminList,
  })
  @ApiOperation({
    summary: 'List all actively logged in admins',
  })
  active() {
    return this.authService.active();
  }
}
