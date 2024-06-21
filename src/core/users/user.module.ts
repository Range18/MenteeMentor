import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { SessionEntity } from '#src/core/session/entity/session.entity';
import { UserController } from '#src/core/users/user.controller';
import { SessionService } from '#src/core/session/session.service';
import { TokenService } from '#src/core/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SessionEntity])],
  providers: [SessionService, TokenService, JwtService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
