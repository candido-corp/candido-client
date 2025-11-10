export enum EnumUserRoles {
  ADMIN = 'ROLE_ADMIN',
  USER_VERIFIED = 'ROLE_USER_VERIFIED',
  USER_NOT_VERIFIED = 'ROLE_USER_NOT_VERIFIED',
}

export enum EnumUserPermissions {
  ADMIN_READ = 'admin:read',
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
}

export enum EnumUserGenders {
  FEMALE = 1,
  MALE = 2,
  OTHER = 3,
}

export enum EnumUserSettingsKey {
  LANGUAGE = 'S_LANG',
  THEME = 'S_THEME',
}
