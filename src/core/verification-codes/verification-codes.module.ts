import { Module } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { VerificationCodesController } from './verification-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeEntity } from '#src/core/verification-codes/entities/verification-code.entity';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCodeEntity]),
    UserModule,
    TokenModule,
    SessionModule,
  ],
  controllers: [VerificationCodesController],
  providers: [VerificationCodesService],
  exports: [VerificationCodesService],
})
export class VerificationCodesModule {}
