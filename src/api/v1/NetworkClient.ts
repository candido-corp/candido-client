import { DELETE, GET, POST, PUT } from '@/api/v1/NetworkDecorator.ts';
import { ApiRequestAccountChangePassword } from '@/api/v1/requests/ApiRequestAccountChangePassword.ts';
import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin.ts';
import { ApiRequestRegister } from '@/api/v1/requests/ApiRequestRegister.ts';
import { ApiRequestRegisterCodeResend } from '@/api/v1/requests/ApiRequestRegisterCodeResend.ts';
import { ApiRequestRegisterVerify } from '@/api/v1/requests/ApiRequestRegisterVerify';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword.ts';
import { ApiRequestResetPasswordCheckValidity } from '@/api/v1/requests/ApiRequestResetPasswordCheckValidity.ts';
import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend.ts';
import ConfigApp from '@/config/ConfigApp.ts';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiRequestAccountChangeDetails } from './requests/ApiRequestAccountChangeDetails';
import { ApiRequestAccountDetailsAddress } from './requests/ApiRequestAccountDetailsAddress';
import { ApiResponseAccount } from './responses/ApiResponseAccount';
import { ApiResponseAccountDetails } from './responses/ApiResponseAccountDetails';
import { ApiResponseAccountDetailsAddresses } from './responses/ApiResponseAccountDetailsAddresses';
import { ApiResponseGeos } from './responses/ApiResponseGeos';
import { ApiResponseGeosAddressTypes } from './responses/ApiResponseGeosAddressTypes';
import { ApiResponseGeosChildren } from './responses/ApiResponseGeosChildren';

export enum EnumServerRoutes {
  API_V1 = '/api/v1',

  LOGIN = API_V1 + '/auth/login',
  LOGOUT = API_V1 + '/auth/logout',
  REFRESH_TOKEN = API_V1 + '/auth/token/refresh',

  REGISTER = API_V1 + '/auth/register',
  REGISTER_VERIFY = API_V1 + '/auth/register/verify',
  REGISTER_EMAIL_RESEND = API_V1 + '/auth/register/email/resend',

  REGISTER_CODE_RESEND = API_V1 + '/auth/register/code/resend',

  RESET_PASSWORD_SEND = API_V1 + '/auth/reset-password/send',
  RESET_PASSWORD_CHANGE_PASSWORD = API_V1 +
    '/auth/reset-password/change-password',
  RESET_PASSWORD_CHECK_VALIDITY = API_V1 +
    '/auth/reset-password/check-validity',

  ACCOUNT = API_V1 + '/me',
  ACCOUNT_PASSWORD = API_V1 + '/me/password',
  ACCOUNT_DETAILS = API_V1 + '/me/details',
  ACCOUNT_DETAILS_ADDRESSES = API_V1 + '/me/details/addresses',
  ACCOUNT_DETAILS_ADDRESS = API_V1 + '/me/details/addresses/:addressId',

  GENDERS = API_V1 + '/genders',

  GEOS = API_V1 + '/geos',
  GEOS_CHILDREN = API_V1 + '/geos/:geoId/children',
  GEOS_ADDRESS_TYPES = API_V1 + '/geos/address-types',
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

  @POST(EnumServerRoutes.REGISTER)
  async register(_options: {
    data: ApiRequestRegister;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_VERIFY)
  async registerVerify(_options: {
    data: ApiRequestRegisterVerify;
  }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL_RESEND)
  async registerEmailResend(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_RESEND)
  async registerCodeResend(_options: {
    data: ApiRequestRegisterCodeResend;
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

  @GET(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESSES)
  async getAccountDetailsAddresses(): Promise<
    AxiosResponse<ApiResponseAccountDetailsAddresses>
  > {
    return {} as AxiosResponse<ApiResponseAccountDetailsAddresses>;
  }

  @POST(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESSES)
  async addAccountDetailsAddress(_options: {
    data: ApiRequestAccountDetailsAddress;
  }): Promise<AxiosResponse<ApiResponseAccountDetailsAddresses>> {
    return {} as AxiosResponse<ApiResponseAccountDetailsAddresses>;
  }

  @PUT(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESS)
  async changeAccountDetailsAddress(_options: {
    pathParams: { addressId: string | number };
    data: ApiRequestAccountDetailsAddress;
  }): Promise<AxiosResponse<ApiResponseAccountDetailsAddresses>> {
    return {} as AxiosResponse<ApiResponseAccountDetailsAddresses>;
  }

  @DELETE(EnumServerRoutes.ACCOUNT_DETAILS_ADDRESS)
  async deleteAccountDetailsAddress(_options: {
    pathParams: { addressId: string | number };
  }): Promise<AxiosResponse<AxiosResponse>> {
    return {} as AxiosResponse<AxiosResponse>;
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
  async getCountriesChildren(_options: {
    pathParams: { geoId: string | number };
  }): Promise<AxiosResponse<ApiResponseGeosChildren>> {
    return {} as AxiosResponse<ApiResponseGeosChildren>;
  }

  @GET(EnumServerRoutes.GEOS_ADDRESS_TYPES)
  async getAddressTypes(): Promise<AxiosResponse<ApiResponseGeosAddressTypes>> {
    return {} as AxiosResponse<ApiResponseGeosAddressTypes>;
  }
}

export default new NetworkClient();
