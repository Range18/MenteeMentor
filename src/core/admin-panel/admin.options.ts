import { authenticate } from '#src/core/admin-panel/admin-authenticate';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { SessionEntity } from '#src/core/session/entity/session.entity';
import { adminConfig } from '#src/common/configs/admin.config';

export const adminOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [UserEntity, SessionEntity],
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
