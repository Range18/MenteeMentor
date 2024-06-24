import { authenticate } from '#src/core/admin-panel/admin-authenticate';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { SessionEntity } from '#src/core/session/entity/session.entity';
import { adminConfig } from '#src/common/configs/admin.config';
import { VerificationCodeEntity } from '#src/core/verification-codes/entities/verification-code.entity';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';
import { LanguageEntity } from '#src/core/languages/entities/language.entity';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';

export const adminOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [
      UserEntity,
      SessionEntity,
      VerificationCodeEntity,
      ProfileEntity,
      SubjectEntity,
      LanguageEntity,
    ],
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: adminConfig.adminPanelSecret,
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: adminConfig.adminPanelSecret,
  },
};
