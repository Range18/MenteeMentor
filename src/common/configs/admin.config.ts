import 'dotenv/config';
import { get } from 'env-var';

export const adminConfig = {
  login: get('ADMIN_LOGIN').required().asString(),
  password: get('ADMIN_PASSWORD').required().asString(),
  adminPanelSecret: get('ADMIN_SECRET').required().asString(),
};
