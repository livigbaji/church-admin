import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MembersService } from '../services/members.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MemberListResponse } from 'src/types';
import { CreateMemberDTO } from '../dtos/member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/')
  @ApiOkResponse({
    type: MemberListResponse,
  })
  @ApiBearerAuth()
  listMembers(@Query('search') search: string) {
    return this.membersService.search(search);
  }

  @Post('/')
  @ApiCreatedResponse({
    type: MemberListResponse,
  })
  @ApiBearerAuth()
  createMember(@Body() member: CreateMemberDTO) {
    return this.membersService.create(member);
  }

  @Put('/:member')
  @ApiOkResponse({
    type: MemberListResponse,
  })
  @ApiBearerAuth()
  updateMember(@Param('member') id: string, @Body() member: CreateMemberDTO) {
    return this.membersService.update(id, member);
  }
}
