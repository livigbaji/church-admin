import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MembersService } from '../services/members.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMemberDTO, MemberListResponse } from '../dtos/member.dto';
import { Member } from '../models/member.model';

@ApiTags('Member')
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
    type: Member,
  })
  @ApiBearerAuth()
  updateMember(@Param('member') id: string, @Body() member: CreateMemberDTO) {
    return this.membersService.update(id, member);
  }
}
