import { Injectable } from '@nestjs/common';
import { Admin, AdminDocument } from '../models/admin.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authenticator } from 'otplib';
import { NewAdminDTO } from '../dtos/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async generate(newAdmin: NewAdminDTO) {
    if (newAdmin.resetOld) {
      await this.adminModel.updateOne(
        {
          member: newAdmin.member,
          active: true,
        },
        {
          $set: {
            active: false,
            inactiveAt: new Date(),
          },
        },
      );
    }

    const admin = await this.adminModel.findOneAndUpdate(
      {
        member: newAdmin.member,
        active: true,
      },
      {
        $set: {
          inactiveAt: null,
        },
        ...(newAdmin.resetOld && {
          $setOnInsert: {
            member: newAdmin.member,
            active: true,
            secret: authenticator.generateSecret(),
          },
        }),
      },
      {
        new: true,
        upsert: true,
      },
    );

    return {
      secret: admin.secret,
      url: authenticator.keyuri(
        'Admin',
        'LFC Lokogoma',
        admin.secret.toString(),
      ),
    };
  }

  deactivate(admin: string) {
    return this.adminModel
      .findOneAndUpdate(
        {
          member: admin,
          active: true,
        },
        {
          $set: {
            active: false,
            inactiveAt: new Date(),
          },
        },
      )
      .exec();
  }

  listAdmins() {
    return this.adminModel
      .find({
        active: true,
      })
      .exec();
  }
}
