import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '#src/core/users/user.module';
import { SessionModule } from '#src/core/session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';
import { LanguagesModule } from '#src/core/languages/languages.module';
import { SubjectsModule } from '#src/core/subjects/subjects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    UserModule,
    SessionModule,
    TokenModule,
    LanguagesModule,
    SubjectsModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
