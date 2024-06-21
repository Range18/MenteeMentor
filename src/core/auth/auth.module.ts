import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { adminOptions } from '#src/core/admin-panel/admin.options';
import { VerificationCodesModule } from '#src/core/verification-codes/verification-codes.module';

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: async () => {
        AdminJS.registerAdapter({
          Database,
          Resource,
        });
        return adminOptions;
      },
    }),
    UserModule,
    SessionModule,
    TokenModule,
    VerificationCodesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
