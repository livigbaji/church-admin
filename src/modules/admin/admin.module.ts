import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AdminController, AuthController],
})
export class AdminModule {}
