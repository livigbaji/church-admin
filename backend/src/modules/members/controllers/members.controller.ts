import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MembersService } from '../services/members.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateMemberDTO,
  MemberExportRequest,
  MemberImportCompleteResponse,
  MemberListResponse,
} from '../dtos/member.dto';
import { Member } from '../models/member.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('Member')
@Controller('/api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/')
  @ApiOkResponse({
    type: MemberListResponse,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    example: 0,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    example: 1000,
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: 'List unit members',
  })
  @ApiBearerAuth()
  listMembers(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('skip') skip: string,
  ) {
    return this.membersService.search(parseInt(skip), parseInt(limit), search);
  }

  @Post('/')
  @ApiCreatedResponse({
    type: MemberListResponse,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new member to the unit',
  })
  createMember(@Body() member: CreateMemberDTO) {
    return this.membersService.create(member);
  }

  @Post('/import')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('list'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['list'],
      properties: {
        list: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    type: MemberImportCompleteResponse,
  })
  @ApiOperation({
    summary: 'Bulk import of members as json',
  })
  importMembers(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'File should not be more than 1MB',
          }),
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.membersService.import(file.path);
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  @Post('/export')
  @ApiOperation({
    summary: 'Export all unit members to excel file',
  })
  async exportMembers(
    @Res() response: Response,
    @Body() { name }: MemberExportRequest,
  ) {
    response.contentType('image/png');
    response.download(await this.membersService.export(name));
  }

  @Put('/:member')
  @ApiOkResponse({
    type: Member,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update member information',
  })
  updateMember(@Param('member') id: string, @Body() member: CreateMemberDTO) {
    return this.membersService.update(id, member);
  }
}
