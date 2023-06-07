import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { Admin, AdminSchema } from './models/admin.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './models/login.model';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Login.name, schema: LoginSchema },
    ]),
    MembersModule,
  ],
  controllers: [AdminController, AuthController],
  providers: [AuthService, AdminService],
})
export class AdminModule {}
