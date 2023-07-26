import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BirthdaysService } from '../services/birthdays.service';
import { BirthdayForm, BirthdayResponse } from '../dtos/birthday.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Birthday')
@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdayService: BirthdaysService) {}

  @Get('/week')
  @ApiOkResponse({
    type: BirthdayResponse,
  })
  @ApiOperation({
    summary: 'Get birthdays occuring this week',
  })
  getThisWeekBirthdays() {
    return this.birthdayService.getBirthdaysForWeek();
  }

  @Get('/month')
  @ApiOkResponse({
    type: BirthdayResponse,
  })
  @ApiOperation({
    summary: 'Get birthdays occuring this month',
  })
  @ApiQuery({
    name: 'month',
    required: false,
    description: 'Defaults to this month if empty',
  })
  getThisMonthBirthdays(@Query('month') month: number) {
    return this.birthdayService.getBirthdayForMonth(month);
  }

  @Get('/today')
  @ApiOkResponse({
    type: BirthdayResponse,
  })
  @ApiOperation({
    summary: 'Get birthdays occuring today',
  })
  getTodaysBirthdays() {
    return this.birthdayService.getBirthdaysForToday();
  }

  @Get('/')
  @ApiOkResponse({
    type: BirthdayResponse,
  })
  @ApiOperation({
    summary: 'Get birthday form submission',
  })
  @ApiQuery({
    name: 'month',
    required: false,
    description: 'Defaults to this month if empty',
  })
  getBirthdayRecords(@Query('month') month: number) {
    return this.birthdayService.getCelebrantForms(month);
  }

  @Post('/:celebrant')
  @ApiCreatedResponse({
    type: BirthdayResponse,
  })
  @ApiOperation({
    summary: 'Get birthday form submission',
  })
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['picture', 'motivation', 'prayer', 'favouriteColour'],
      properties: {
        picture: {
          type: 'string',
          format: 'binary',
        },
        motivation: {
          type: 'string',
        },
        prayer: {
          type: 'string',
        },
        favouriteColour: {
          type: 'string',
        },
      },
    },
  })
  sendBirthdayRecord(
    @Body() birthday: BirthdayForm,
    @Param('celebrant') celebrant: string,
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
    return this.birthdayService.submitBirthdayForm(
      celebrant,
      birthday,
      file.path,
    );
  }
}
