export enum EnumRoutes {
  DASHBOARD = '/',

  LOGIN = '/login',
  LOGIN_BLUR = '/login/blur',
  LOGOUT = '/logout',

  REGISTER = '/register',
  REGISTER_VERIFY_BY_EMAIL = '/register/email/verify/:token',

  RESET_PASSWORD = '/reset-password',

  USER = '/user',
  USER_OPPORTUNITIES = '/user/opportunities',
  USER_OPPORTUNITIES_STATS = '/user/opportunities/stats',
  USER_OPPORTUNITIES_HISTORY = '/user/opportunities/history',
  USER_OPPORTUNITIES_SAVED = '/user/opportunities/saved',

  FORMS = '/forms',
  FORMS_FORM = '/forms/:formId',
  FORMS_FORM_SETTINGS = '/forms/:formId/settings',
  FORMS_FORM_BUILDER = '/forms/:formId/builder',
  FORMS_FORM_BUILDER_PREVIEW = '/forms/:formId/builder/preview',

  SETTINGS = '/settings',
  SETTINGS_GENERAL = '/settings/general',
  SETTINGS_USER = '/settings/user',
  SETTINGS_FORMS = '/settings/forms',

  OPPORTUNITIES = '/opportunities',
  OPPORTUNITIES_OPPORTUNITY = '/opportunities/:opportunityId',
  OPPORTUNITIES_OPPORTUNITY_APPLY = '/opportunities/:opportunityId/apply',
}
