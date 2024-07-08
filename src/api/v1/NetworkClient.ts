import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseLoginData } from '@/api/v1/responses/ResponseLoginData.ts';
import { POST, GET, PUT } from '@/api/v1/NetworkDecorator.ts';
import { RequestLogin } from '@/api/v1/requests/RequestLogin.ts';
import { RequestRegister } from '@/api/v1/requests/RequestRegister.ts';
import { RequestRegisterEmailVerify } from '@/api/v1/requests/RequestRegisterEmailVerify.ts';
import { ResponseRegisterCode } from '@/api/v1/responses/ResponseRegisterCode.ts';
import { RequestRegisterCodeResend } from '@/api/v1/requests/RequestRegisterCodeResend.ts';
import { RequestRegisterCodeVerify } from '@/api/v1/requests/RequestRegisterCodeVerify.ts';
import { RequestResetPasswordSend } from '@/api/v1/requests/RequestResetPasswordSend.ts';
import { RequestResetPasswordCheckValidity } from '@/api/v1/requests/RequestResetPasswordCheckValidity.ts';
import { RequestResetPasswordChangePassword } from '@/api/v1/requests/RequestResetPasswordChangePassword.ts';
import { RequestAccountChangePassword } from '@/api/v1/requests/RequestAccountChangePassword.ts';

export enum EnumServerRoutes {
  API_V1 = "/api/v1",

  LOGIN = API_V1 + "/auth/login",
  LOGOUT = API_V1 + "/auth/logout",
  REFRESH_TOKEN = API_V1 + "/auth/token/refresh",

  REGISTER_EMAIL = API_V1 + "/auth/register/email",
  REGISTER_EMAIL_VERIFY = API_V1 + "/auth/register/email/verify",

  REGISTER_CODE = API_V1 + "/auth/register/code",
  REGISTER_CODE_VERIFY = API_V1 + "/auth/register/code/verify",
  REGISTER_CODE_RESEND = API_V1 + "/auth/register/code/resend",

  RESET_PASSWORD_SEND = API_V1 + "/auth/reset-password/send",
  RESET_PASSWORD_CHANGE_PASSWORD = API_V1 + "/auth/reset-password/change-password",
  RESET_PASSWORD_CHECK_VALIDITY = API_V1 + "/auth/reset-password/check-validity",

  ACCOUNT = API_V1 + "/me",
  ACCOUNT_DETAILS = API_V1 + "/me/details",
  ACCOUNT_PASSWORD = API_V1 + "/me/password",

  GENDERS = API_V1 + "/genders",
}


// Implementazione della classe NetworkClient con i decoratori
class NetworkClient {
  client = axios.create({
    baseURL: 'http://candido-middleware.localhost',
    withCredentials: true,
  });

  @POST(EnumServerRoutes.LOGIN)
  async login(_options: { data: RequestLogin }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @POST(EnumServerRoutes.LOGOUT)
  async logout(): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REFRESH_TOKEN)
  async refreshToken(_options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL)
  async registerEmail(_options: { data: RequestRegister }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_EMAIL_VERIFY)
  async registerEmailVerify(_options: { data: RequestRegisterEmailVerify }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE)
  async registerCode(_options: { data: RequestRegister }): Promise<AxiosResponse<ResponseRegisterCode>> {
    return {} as AxiosResponse<ResponseRegisterCode>;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_RESEND)
  async registerCodeResend(_options: { data: RequestRegisterCodeResend }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.REGISTER_CODE_VERIFY)
  async registerCodeVerify(_options: { data: RequestRegisterCodeVerify }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_SEND)
  async resetPasswordSend(_options: { data: RequestResetPasswordSend }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.RESET_PASSWORD_CHECK_VALIDITY)
  async resetPasswordCheckValidity(_options: { params: RequestResetPasswordCheckValidity }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @POST(EnumServerRoutes.RESET_PASSWORD_CHANGE_PASSWORD)
  async resetPasswordChangePassword(_options: { data: RequestResetPasswordChangePassword }): Promise<AxiosResponse<ResponseLoginData>> {
    return {} as AxiosResponse<ResponseLoginData>;
  }

  @GET(EnumServerRoutes.ACCOUNT)
  async getAccount(_options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.ACCOUNT_DETAILS)
  async getAccountDetails(_options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @PUT(EnumServerRoutes.ACCOUNT_PASSWORD)
  async changeAccountPassword(_options: { axiosConfig?: AxiosRequestConfig, data: RequestAccountChangePassword }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }

  @GET(EnumServerRoutes.GENDERS)
  async getGenders(_options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
    return {} as AxiosResponse;
  }
}

export default new NetworkClient();
