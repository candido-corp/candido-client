import { GET, POST, PUT } from '@/api/v1/NetworkDecorator.ts';
import { ApiRequestAccountChangePassword } from '@/api/v1/requests/ApiRequestAccountChangePassword.ts';
import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin.ts';
import { ApiRequestRegister } from '@/api/v1/requests/ApiRequestRegister.ts';
import { ApiRequestRegisterCodeResend } from '@/api/v1/requests/ApiRequestRegisterCodeResend.ts';
import { ApiRequestRegisterCodeVerify } from '@/api/v1/requests/ApiRequestRegisterCodeVerify.ts';
import { ApiRequestRegisterEmailVerify } from '@/api/v1/requests/ApiRequestRegisterEmailVerify.ts';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword.ts';
import { ApiRequestResetPasswordCheckValidity } from '@/api/v1/requests/ApiRequestResetPasswordCheckValidity.ts';
import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend.ts';
import { ApiResponseRegisterCode } from '@/api/v1/responses/ApiResponseRegisterCode.ts';
import ConfigApp from '@/config/ConfigApp.ts';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiRequestAccountChangeDetails } from './requests/ApiRequestAccountChangeDetails';
import { ApiResponseAccount } from './responses/ApiResponseAccount';
import { ApiResponseAccountDetails } from './responses/ApiResponseAccountDetails';
import { ApiResponseGeos } from './responses/ApiResponseGeos';

export enum EnumServerRoutes {
  API_V1 = '/api/v1',

  LOGIN = API_V1 + '/auth/login',
  LOGOUT = API_V1 + '/auth/logout',
  REFRESH_TOKEN = API_V1 + '/auth/token/refresh',

  REGISTER_EMAIL = API_V1 + '/auth/register/email',
  REGISTER_EMAIL_VERIFY = API_V1 + '/auth/register/email/verify',

  REGISTER_CODE = API_V1 + '/auth/register/code',
  REGISTER_CODE_VERIFY = API_V1 + '/auth/register/code/verify',
  REGISTER_CODE_RESEND = API_V1 + '/auth/register/code/resend',

  RESET_PASSWORD_SEND = API_V1 + '/auth/reset-password/send',
  RESET_PASSWORD_CHANGE_PASSWORD = API_V1 +
    '/auth/reset-password/change-password',
  RESET_PASSWORD_CHECK_VALIDITY = API_V1 +
    '/auth/reset-password/check-validity',

  ACCOUNT = API_V1 + '/me',
  ACCOUNT_DETAILS = API_V1 + '/me/details',
  ACCOUNT_PASSWORD = API_V1 + '/me/password',

  GENDERS = API_V1 + '/genders',

  GEOS = API_V1 + '/geos',
  GEOS_CHILDREN = API_V1 + '/geos/:geoId/children',
}

class NetworkClient {
  client = axios.create({
    baseURL: ConfigApp.external_api_host,
    withCredentials: true,
  });

  hooksLogout?: () => void;

  public constructor() {
    this.initializeResponseInterceptor();
  }

  /**
   * Set the logout function
   * @param logout - Logout function
   */
  public setLogoutFunction(logout: () => void) {
    this.hooksLogout = logout;
  }

  /**
   * Initialize the response interceptor
   */
  private initializeResponseInterceptor = () => {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const isUnauthorized = error.response?.status === 401;
        const isRefreshTokenPath =
          error.response?.config.url === EnumServerRoutes.REFRESH_TOKEN;

        if (isUnauthorized && !isRefreshTokenPath) {
          this.logout().then(() => {
            if (typeof this.hooksLogout === 'function') {
              this.hooksLogout!();
            }
          });
        }
        return Promise.reject(error);
      }
    );
  };

  @POST(EnumServerRoutes.LOGIN)
  async login(_options: { data: ApiRequestLogin }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.LOGOUT)
  async logout(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REFRESH_TOKEN)
  async refreshToken(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL)
  async registerEmail(_options: {
    data: ApiRequestRegister;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL_VERIFY)
  async registerEmailVerify(_options: {
    data: ApiRequestRegisterEmailVerify;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE)
  async registerCode(_options: {
    data: ApiRequestRegister;
  }): Promise<AxiosResponse<ApiResponseRegisterCode>> {
    return {} as AxiosResponse<ApiResponseRegisterCode>;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_RESEND)
  async registerCodeResend(_options: {
    data: ApiRequestRegisterCodeResend;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_VERIFY)
  async registerCodeVerify(_options: {
    data: ApiRequestRegisterCodeVerify;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_SEND)
  async resetPasswordSend(_options: {
    data: ApiRequestResetPasswordSend;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.RESET_PASSWORD_CHECK_VALIDITY)
  async resetPasswordCheckValidity(_options: {
    params: ApiRequestResetPasswordCheckValidity;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_CHANGE_PASSWORD)
  async resetPasswordChangePassword(_options: {
    data: ApiRequestResetPasswordChangePassword;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.ACCOUNT)
  async getAccount(): Promise<AxiosResponse<ApiResponseAccount>> {
    return {} as AxiosResponse<ApiResponseAccount>;
  }

  @GET(EnumServerRoutes.ACCOUNT_DETAILS)
  async getAccountDetails(): Promise<AxiosResponse<ApiResponseAccountDetails>> {
    return {} as AxiosResponse<ApiResponseAccountDetails>;
  }

  @PUT(EnumServerRoutes.ACCOUNT_DETAILS)
  async changeAccountDetails(_options: {
    data: ApiRequestAccountChangeDetails;
  }): Promise<AxiosResponse<ApiResponseAccountDetails>> {
    return {} as AxiosResponse<ApiResponseAccountDetails>;
  }

  @PUT(EnumServerRoutes.ACCOUNT_PASSWORD)
  async changeAccountPassword(_options: {
    data: ApiRequestAccountChangePassword;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GENDERS)
  async getGenders(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GEOS)
  async getCountries(): Promise<AxiosResponse<ApiResponseGeos>> {
    return {} as AxiosResponse<ApiResponseGeos>;
  }

  @GET(EnumServerRoutes.GEOS_CHILDREN)
  async getCountriesChildren(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }
}

export default new NetworkClient();
