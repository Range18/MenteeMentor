export namespace AllExceptions {
  export enum AuthExceptions {
    IsNotVerified = 'Account is not verified. Please verify your account',
    WrongPassword = 'Wrong password',
    ExpiredToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session is not found',
    SessionExpired = 'Session expired',
  }

  export enum UserExceptions {
    UserNotFound = 'User is not found',
    UserAlreadyExists = 'User already exists',
  }

  export enum CodeExceptions {
    NotFound = 'Verification code is not found',
    InvalidCode = 'Invalid verification code',
  }

  export enum ProfileExceptions {
    NotFound = 'Profile is not found',
  }

  export enum LanguageExceptions {
    NotFound = 'Language is not found',
  }

  export enum SubjectExceptions {
    NotFound = 'Subject is not found',
  }

  export enum QuestionExceptions {
    NotFound = 'Question is not found',
  }

  export enum TagExceptions {
    NotFound = 'Tag is not found',
  }

  export enum PermissionExceptions {
    NotTheSameUser = 'Action is forbidden because user is not owner',
    NoRequiredRole = 'You are not allowed to do that action, because of your role',
  }
}
