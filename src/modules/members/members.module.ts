import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './models/member.model';
import { LeadershipService } from './services/leadership.service';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';
import { LeadershipController } from './controllers/leadership.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  providers: [LeadershipService, UnitsService],
  controllers: [UnitsController, LeadershipController],
})
export class MembersModule {}
