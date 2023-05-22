import { Injectable } from '@nestjs/common';
import { Member, MemberDocument } from '../models/member.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  search(search?: string) {
    return this.memberModel.find({
      ...(search && { $text: { $search: search } }),
    });
  }

  create(member: Member) {
    return this.memberModel.create(member);
  }

  update(id: string, member: Partial<Member>) {
    return this.memberModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: member,
      },
      {
        new: true,
      },
    );
  }
}
