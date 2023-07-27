import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authenticator } from 'otplib';
import { NewAuthDTO } from '../dtos/auth.dto';
import { Admin, AdminDocument } from '../models/admin.model';
import { Login, LoginDocument } from '../models/login.model';
import { MembersService } from 'src/modules/members/services/members.service';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { differenceInSeconds } from 'date-fns';

@Injectable()
export class AuthService {
  private readonly encodeKey: string =
    this.configSerivce.get<string>('JWT_KEY');

  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Login.name)
    private readonly loginModel: Model<LoginDocument>,
    private readonly memberService: MembersService,
    private readonly configSerivce: ConfigService,
  ) {}

  async start(newAuth: NewAuthDTO, ip: string, device: string) {
    const member = await this.memberService
      .findByPhone(newAuth.phone)
      .then((result) => {
        if (!result) {
          throw new BadRequestException('invalid login credential');
        }
        return result;
      });

    const authCredentials = await this.adminModel
      .findOne({
        member: member._id,
        active: true,
      })
      .then((result) => {
        if (!result) {
          throw new BadRequestException('invalid login credential');
        }
        return result;
      });

    const validation = authenticator.verify({
      token: newAuth.otp,
      secret: authCredentials.secret,
    });

    if (!validation) {
      throw new BadRequestException('invalid login credential');
    }

    const login = await this.loginModel.create({
      member: member._id,
      device,
      ip,
    });

    return {
      member,
      expiresAt: login.expiresAt,
      token: this.signToken(
        {
          session: login._id,
        },
        {
          expiresIn: differenceInSeconds(new Date(), login.expiresAt),
        },
      ),
    };
  }

  signToken(payload: string | object, options = {}) {
    return sign(payload, this.encodeKey, {
      issuer: 'LFC Lokogoma',
      ...options,
    });
  }

  decodeToken(payload: string, options = {}) {
    return verify(payload, this.encodeKey, {
      issuer: 'LFC Lokogoma',
      ...options,
    });
  }

  async verifySession(payload: string) {
    try {
      const decoded = this.decodeToken(payload) as JwtPayload;

      if (!decoded || !decoded.session) {
        throw new UnauthorizedException();
      }

      const session = await this.loginModel
        .findOne({
          _id: decoded.session,
          active: true,
          expiresAt: { $gte: new Date() },
        })
        .then((result) => {
          if (!result) {
            throw new UnauthorizedException();
          }

          return result;
        });

      await this.adminModel
        .exists({
          member: session.member,
        })
        .then((result) => {
          if (!result) {
            throw new UnauthorizedException();
          }

          return result;
        });

      return this.memberService.findOne(session.member.toString());
    } catch (e) {
      throw new UnauthorizedException(
        'Cannot complete request. Please login again',
      );
    }
  }

  invalidate(login: string) {
    return this.loginModel.findOneAndUpdate(
      {
        _id: login,
      },
      {
        $set: {
          active: false,
          inactiveAt: new Date(),
        },
      },
    );
  }

  history() {
    // TODO populate with names
    return this.loginModel.find({
      $or: [{ active: false }, { expiresAt: { $lt: new Date() } }],
    });
  }

  active() {
    // TODO populate with names
    return this.loginModel.find({
      active: true,
    });
  }
}
