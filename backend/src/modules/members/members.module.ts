import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './models/member.model';
import { LeadershipService } from './services/leadership.service';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';
import { LeadershipController } from './controllers/leadership.controller';
import { Unit, UnitSchema } from './models/unit.model';
import { LeaderSchema, Leadership } from './models/leadership.model';
import { MembersService } from './services/members.service';
import { MembersController } from './controllers/members.controller';
import { MulterModule } from '@nestjs/platform-express';
import { BirthdaysController } from './controllers/birthdays.controller';
import { BirthdaysService } from './services/birthdays.service';
import { Birthday, BirthdaySchema } from './models/birthday.model';
import { ConfigsController } from './controllers/configs.controller';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: Leadership.name, schema: LeaderSchema },
      { name: Birthday.name, schema: BirthdaySchema },
    ]),
    forwardRef(() => AdminModule),
  ],
  providers: [
    LeadershipService,
    UnitsService,
    MembersService,
    BirthdaysService,
  ],
  controllers: [
    UnitsController,
    LeadershipController,
    MembersController,
    BirthdaysController,
    ConfigsController,
  ],
  exports: [MembersService],
})
export class MembersModule {}
