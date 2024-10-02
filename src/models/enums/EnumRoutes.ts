export enum EnumRoutes {
  //LANDING
  HOME = '/',
  OPPORTUNITIES = '/opportunities',
  OPPORTUNITIES_OPPORTUNITY = '/opportunities/:opportunityId',
  OPPORTUNITIES_OPPORTUNITY_APPLY = '/opportunities/:opportunityId/apply',

  //AUTH
  LOGIN = '/login',
  LOGIN_BLUR = '/login/blur',
  LOGOUT = '/logout',

  REGISTER = '/register',
  REGISTER_VERIFY_BY_EMAIL = '/register/email/verify',

  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',

  //APP
  DASHBOARD = '/dashboard',
  USER = '/user',
  USER_OPPORTUNITIES = '/user/opportunities',
  USER_OPPORTUNITIES_STATS = '/user/opportunities/stats',
  USER_OPPORTUNITIES_HISTORY = '/user/opportunities/history',
  USER_OPPORTUNITIES_SAVED = '/user/opportunities/saved',

  FORMS = '/forms',
  FORMS_CREATE = '/forms/create',
  FORMS_FORM = '/forms/:formId',
  FORMS_FORM_BUILDER = '/forms/:formId/builder',
  FORMS_FORM_BUILDER_PREVIEW = '/forms/:formId/builder/preview',

  SETTINGS = '/settings',
  SETTINGS_GENERAL = '/settings/general',
  SETTINGS_USER = '/settings/user',
  SETTINGS_FORM = '/settings/form',
}
