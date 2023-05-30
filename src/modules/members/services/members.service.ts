import { Injectable } from '@nestjs/common';
import { Member, MemberDocument } from '../models/member.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitMembershipStatus } from 'src/types';
import { CreateMemberDTO } from '../dtos/member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  search(search?: string) {
    return this.memberModel
      .find({
        deleted: false,
        ...(search && { $text: { $search: search } }),
      })
      .then((records) => ({ records }));
  }

  create(member: CreateMemberDTO) {
    return this.memberModel.create(member);
  }

  findOne(member: string) {
    return this.memberModel.findById(member);
  }

  update(id: string, member: Partial<Member>) {
    return this.memberModel.findOneAndUpdate(
      {
        _id: id,
        deleted: false,
      },
      {
        $set: member,
      },
      {
        new: true,
      },
    );
  }

  addInterestToUnit(member: string, unit: string) {
    return this.memberModel.findByIdAndUpdate(
      {
        _id: member,
        'units.unit': { $ne: unit },
      },
      {
        $push: {
          units: {
            unit,
            status: UnitMembershipStatus.INTERESTED,
            interestedAt: new Date(),
          },
        },
      },
      {
        new: true,
      },
    );
  }

  servedInUnit(member: string, unit: string) {
    return this.memberModel.findByIdAndUpdate(
      {
        _id: member,
        'units.unit': { $ne: unit },
      },
      {
        $push: {
          units: {
            unit,
            status: UnitMembershipStatus.SERVING,
            startedAt: new Date(),
          },
        },
      },
      {
        new: true,
      },
    );
  }

  delete(ids: string[]) {
    return this.memberModel
      .updateMany(
        {
          _id: { $in: ids },
        },
        {
          $set: {
            deleted: true,
            deletedAt: new Date(),
          },
        },
      )
      .then(({ modifiedCount }) => {
        return { deleted: modifiedCount };
      });
  }

  restore(ids: string[]) {
    return this.memberModel
      .updateMany(
        {
          _id: { $in: ids },
        },
        {
          $set: {
            deleted: false,
            deletedAt: null,
          },
        },
      )
      .then(({ modifiedCount }) => {
        return { restored: modifiedCount };
      });
  }
}
