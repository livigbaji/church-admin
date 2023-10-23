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
import {
  AdminList,
  GeneisErrorResponse,
  LoggedInuser,
  NewAuthDTO,
} from '../dtos/auth.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationException } from 'src/types';
import { Auth } from 'src/decorators/permissions.decorator';

@ApiTags('Authentication and Authorization')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Login a member with login(admin) access',
    description:
      'In a pristine system, both the admin and members table will be empty, in that case You will setup the import endpoint',
  })
  @ApiCreatedResponse({
    type: LoggedInuser,
  })
  @ApiNotAcceptableResponse({
    type: GeneisErrorResponse,
  })
  @ApiBadRequestResponse({
    type: ValidationException,
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
  @Auth()
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
  @Auth()
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
  @Auth()
  active() {
    return this.authService.active();
  }
}
