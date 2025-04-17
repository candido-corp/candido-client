export enum EnumRoutes {
  //LANDING
  HOME = '/',

  OPPORTUNITIES = '/opportunities',
  OPPORTUNITIES_OPPORTUNITY = OPPORTUNITIES + '/:opportunityId',
  OPPORTUNITIES_OPPORTUNITY_APPLY = OPPORTUNITIES_OPPORTUNITY + '/apply',

  //AUTH
  LOGIN = '/login',
  LOGIN_BLUR = '/login/blur',
  LOGOUT = '/logout',

  REGISTER = '/register',
  REGISTER_VERIFY = '/register-verify',

  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',

  //APP
  DASHBOARD = '/dashboard',

  USER = '/user',
  USER_DETAILS = USER + '/details',
  USER_ADDRESSES = USER + '/addresses',
  USER_OPPORTUNITIES_SAVED = USER + '/opportunities-saved',

  APPLICATIONS = '/applications',
  APPLICATIONS_HISTORY = APPLICATIONS + '/history',
  APPLICATIONS_SUBMITTED = APPLICATIONS + '/submitted',

  FORMS = '/forms',
  FORMS_CREATE = FORMS + '/create',
  FORMS_FORM = FORMS + '/:formId',
  FORMS_FORM_SETTINGS = FORMS_FORM + '/settings',
  FORMS_FORM_BUILDER = FORMS_FORM + '/builder',
  FORMS_FORM_PREVIEW = FORMS_FORM + '/preview',

  DOCUMENTS = '/documents',
  DOCUMENTS_UPLOAD = DOCUMENTS + '/upload',

  ANALYTICS = '/analytics',
  ANALYTICS_APPLICATIONS = ANALYTICS + '/applications',
  ANALYTICS_FORMS = ANALYTICS + '/forms',
  ANALYTICS_USERS = ANALYTICS + '/user',

  SETTINGS = '/settings',
  SETTINGS_ACCOUNT = SETTINGS + '/account',
  SETTINGS_COMMUNICATION = SETTINGS + '/communication',
  SETTINGS_BILLING = SETTINGS + '/billing',
  SETTINGS_PREFERENCES = SETTINGS + '/preferences',
  SETTINGS_SECURITY = SETTINGS + '/security',
}
