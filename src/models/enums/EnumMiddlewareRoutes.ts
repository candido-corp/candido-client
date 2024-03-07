export enum EnumMiddlewareRoutes {
  API_V1 = "/api/v1",
  LOGIN = API_V1 + "/auth/login",
  REGISTER_EMAIL_VERIFICATION = API_V1 + "/auth/register/email-verification",
  REGISTER_VERIFY_BY_EMAIL = API_V1 + "/auth/register-verify/:token",
  LOGOUT = API_V1 + "/auth/logout",
}
