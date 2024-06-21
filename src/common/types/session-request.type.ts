import { SessionEntity } from '#src/core/session/entity/session.entity';

export type SessionRequest = Pick<SessionEntity, 'sessionId' | 'expireAt'>;
