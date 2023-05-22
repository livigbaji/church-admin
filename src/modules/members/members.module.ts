import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './models/member.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
})
export class MembersModule {}
