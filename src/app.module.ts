import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { UserModule } from '#src/core/users/user.module';
import { SessionModule } from '#src/core/session/session.module';
import { AuthModule } from '#src/core/auth/auth.module';
import { VerificationCodesModule } from '#src/core/verification-codes/verification-codes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    SessionModule,
    AuthModule,
    VerificationCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
