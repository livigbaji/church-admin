import { Injectable } from '@nestjs/common';
import { Member, MemberDocument } from '../models/member.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitMembershipStatus } from 'src/types';
import { CreateMemberDTO, MemberImportEntry } from '../dtos/member.dto';
// import * as fs from 'fs';
import { readFile, utils, writeFile } from 'xlsx';
// set_fs(fs);

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  isEmpty(): Promise<boolean> {
    return this.memberModel.countDocuments().then((count) => !count);
  }

  search(skip = 0, limit = 1000, search?: string) {
    console.log({ search });
    return this.memberModel
      .find({
        deleted: false,
        ...(search && { $text: { $search: search, $caseSensitive: false } }),
      })
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 1000)
      .sort({ firstName: 1 })
      .then((records) => ({ records }));
  }

  create(member: CreateMemberDTO) {
    return this.memberModel.create(member);
  }

  findOne(member: string) {
    return this.memberModel.findById(member);
  }

  findByPhone(phone: string) {
    return this.memberModel.findOne({
      phoneNumber: phone,
    });
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

  async import(filePath: string) {
    // XLSX.st
    const workbook = readFile(filePath);
    const sheet = workbook.Sheets.data;
    const members = utils.sheet_to_json<MemberImportEntry>(sheet);

    await this.memberModel.create(
      members.map((member) => ({
        firstName: member['S-NAME'].split(' ')[0],
        middleName: member['S-NAME'].split(' ')[1] || '',
        lastName: member['S-NAME'].split(' ')[2] || 'Last name',
        maritalStatus: member.STATUS.toUpperCase(),
        gender: member.GENDER.toUpperCase(),
        joinedUnitAt: member['JOINED UNIT'],
        homeCell: member['HOME CELL'],
        joinedCommissionAt: member['JOINED LFC'],
        newBirthAt: member['NEW BIRTH'],
        baptizedAt: member['BAPTISM'],
        occupation: member.OCCUPATION,
        birthday: member.BIRTHDAY,
        phoneNumber: member['PHONE NUMBER'],
        address: member.ADDRESS,
        qualification: member.QUALIFICATION,
        nextofKin: member['NEXT OF KIN'],
        nextOfKinNumber: member['NEXT OF KIN NO'],
        village: member.VILLAGE || 'VILLAGE',
        homeTown: member['HOME TOWN'] || 'HOME TOWN',
        lga: member['LOCAL GOVT'] || 'LGA',
        state: member.STATE || 'STATE',
      })),
    );

    return {
      synced: members.length,
    };
  }

  async export(name: string) {
    const members = await this.memberModel
      .find(
        {
          deleted: false,
        },
        {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      )
      .exec();

    const workSheet = utils.json_to_sheet(
      members.map((member) => ({
        'S-NAME': [member.firstName, member.middleName, member.lastName]
          .filter(Boolean)
          .join(' '),
        STATUS: member.maritalStatus,
        HOBBIES: member.hobbies.join(', '),
        'OTHER UNIT': member.otherUnits.join(', '),
        GENDER: member.gender,
        'JOINED UNIT': member.joinedUnitAt,
        'HOME CELL': member.homeCell,
        'JOINED LFC': member.joinedCommissionAt,
        'NEW BIRTH': member.newBirthAt,
        BAPTISM: member.baptizedAt,
        OCCUPATION: member.occupation.join(', '),
        BIRTHDAY: member.birthday,
        'PHONE NUMBER': member.phoneNumber.join(', '),
        ADDRESS: member.address,
        QUALIFICATION: member.qualification,
        'NEXT OF KIN': member.nextofKin,
        'NEXT OF KIN NO': member.nextOfKinNumber,
        VILLAGE: member.village,
        'LOCAL GOVT': member.lga,
        'HOME TOWN': member.homeTown,
        STATE: member.state,
      })),
    );
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, name);
    const fileName = `upload/${name}-${Date.now()}.xlsx`;
    writeFile(workBook, fileName);
    return fileName;
  }
}
