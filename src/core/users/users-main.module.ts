import { Module } from '@nestjs/common';
import { UserModule } from '#src/core/users/user.module';
import { ProfilesModule } from '#src/core/users/profiles/profiles.module';

@Module({
  imports: [UserModule, ProfilesModule],
  exports: [UserModule, ProfilesModule],
})
export class UsersMainModule {}
