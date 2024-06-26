import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { SessionModule } from '#src/core/session/session.module';
import { AuthModule } from '#src/core/auth/auth.module';
import { VerificationCodesModule } from '#src/core/verification-codes/verification-codes.module';
import { LanguagesModule } from '#src/core/languages/languages.module';
import { UsersMainModule } from '#src/core/users/users-main.module';
import { QuestionsModule } from '#src/core/questions/questions.module';
import { SubjectMainModule } from '#src/core/subjects/subject-main.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    SessionModule,
    UsersMainModule,
    QuestionsModule,
    LanguagesModule,
    SubjectMainModule,
    VerificationCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
