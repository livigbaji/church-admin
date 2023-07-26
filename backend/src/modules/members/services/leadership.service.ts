import { Injectable } from '@nestjs/common';
import { Leadership, LeadershipDocument } from '../models/leadership.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LeadershipDTO } from '../dtos/leadership.dto';

@Injectable()
export class LeadershipService {
  constructor(
    @InjectModel(Leadership.name)
    private readonly memberModel: Model<LeadershipDocument>,
  ) {}

  async create(leader: LeadershipDTO) {
    await this.memberModel.updateOne(
      {
        ...(leader.unit && { unit: leader.unit }),
        position: leader.position,
      },
      {
        $set: {
          endedAt: new Date(),
        },
      },
    );

    return this.memberModel.create({
      ...leader,
      startedAt: new Date(),
    });
  }

  list(unit?: string) {
    return this.memberModel
      .find({
        ...(unit && { unit }),
      })
      .sort({ startedAt: -1 })
      .then((data) => ({ data }));
  }
}
