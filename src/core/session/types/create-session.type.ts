import { TokenPayload } from '#src/core/session/types/token.payload';

export type CreateSession = Pick<TokenPayload, 'userId'>;
