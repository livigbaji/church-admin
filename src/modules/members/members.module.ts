import { Module } from '@nestjs/common';
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
    ]),
  ],
  providers: [LeadershipService, UnitsService, MembersService],
  controllers: [UnitsController, LeadershipController, MembersController],
  exports: [MembersService],
})
export class MembersModule {}
