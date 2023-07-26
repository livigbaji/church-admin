import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from '../models/member.model';
import { Model } from 'mongoose';
import { addDays, endOfWeek, lastDayOfMonth, min, startOfWeek } from 'date-fns';
import { range } from 'lodash';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  BirthdayDocument,
  Birthday as BirthdayModel,
} from '../models/birthday.model';
import { BirthdayForm } from '../dtos/birthday.dto';

@Injectable()
export class BirthdaysService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
    @InjectModel(BirthdayModel.name)
    private readonly birthdayModel: Model<BirthdayDocument>,
  ) {}

  getBirthdaysForNextDay() {
    const nextDay = addDays(new Date(), 1);
    return this.memberModel
      .find({
        birthday: {
          day: nextDay.getDate(),
          month: nextDay.getMonth() + 1,
        },
      })
      .then((data) => ({ data }));
  }

  getBirthdaysForToday() {
    const today = new Date();
    return this.memberModel
      .find({
        birthday: {
          day: today.getDate(),
          month: today.getMonth() + 1,
        },
      })
      .then((data) => ({ data }));
  }

  getBirthdayForMonth(month?: number) {
    const today = new Date();
    return this.memberModel
      .find({
        birthday: {
          month: month || today.getMonth() + 1,
        },
      })
      .then((data) => ({ data }));
  }

  getBirthdaysForWeek() {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const weekStart = startOfWeek(today).getDate();
    const weekEnd = min([endOfWeek(today), lastDayOfMonth(today)]).getDate();
    return this.memberModel
      .find({
        birthday: {
          day: { $in: range(weekStart, weekEnd) },
          month: thisMonth,
        },
      })
      .then((data) => ({ data }));
  }

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async remindNextDayCelebrants() {
    const celebrants = await this.getBirthdaysForNextDay();
    // create forms
    await this.birthdayModel.create(
      celebrants.data.map((celebrant) => ({
        member: celebrant._id,
        questions: {
          favouriteColour: null,
          motivation: null,
          prayer: null,
        },
        picture: null,
      })),
    );

    // send notifications
    return { reminded: celebrants.data.length };
  }

  async getCelebrantForms(month?: number) {
    const celebrants = await this.getBirthdayForMonth(month);
    return this.birthdayModel
      .find({
        member: { $in: celebrants.data.map(({ _id }) => _id) },
      })
      .then((data) => ({ data }));
  }

  canSubmitForm(member: string) {
    const today = new Date();
    return this.memberModel
      .exists({
        _id: member,
        birthday: {
          day: { $in: [today.getDate(), today.getDate() + 1] },
          month: today.getMonth() + 1,
        },
      })
      .then((result) => !!result);
  }

  async submitBirthdayForm(
    celebrant: string,
    birthday: BirthdayForm,
    picture?: string,
  ) {
    await this.canSubmitForm(celebrant).then((answer) => {
      if (!answer) {
        throw new BadRequestException(
          'Sorry you are not allowed to submit a birthday form',
        );
      }
    });
    return this.birthdayModel.findByIdAndUpdate(
      {
        member: celebrant,
      },
      {
        $set: {
          ...birthday,
          ...(picture && { picture }),
        },
        $setOnInsert: {
          member: celebrant,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }

  getUpcomingBirthdaysCount(month?: number) {
    const today = new Date();

    return this.memberModel
      .count({
        birthday: {
          day: { $gt: today.getDate() },
          month: month || today.getMonth() + 1,
        },
      })
      .exec();
  }
}
