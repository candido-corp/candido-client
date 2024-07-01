import { AuthServiceInterface } from './AuthServiceInterface';
import { RequestLoginData } from '../../models/requests/RequestLoginData';
import { RequestRegisterData } from '../../models/requests/RequestRegisterData';
import { API_V1_logout } from '../../api/v1/auth/API_V1_logout';
import { API_V1_login } from '../../api/v1/auth/API_V1_login';
import { API_V1_register_email_verification } from '../../api/v1/auth/API_V1_register_email_verification';
import { RequestRegisterVerifyByEmailData } from '../../models/requests/RequestRegisterVerifyByEmailData';
import { API_V1_register_verify_by_email } from '../../api/v1/auth/API_V1_register_verify_by_email';
import { API_V1_account } from '../../api/v1/auth/API_V1_account';

export default class AuthService implements AuthServiceInterface {
  public async registerEmailVerification(
    data: RequestRegisterData
  ): Promise<Response> {
    return await API_V1_register_email_verification(data);
  }

  public async registerVerifyByEmail(
    data: RequestRegisterVerifyByEmailData
  ): Promise<Response> {
    return await API_V1_register_verify_by_email(data);
  }

  public async login(data: RequestLoginData): Promise<Response> {
    return await API_V1_login(data);
  }

  public async logout(): Promise<Response> {
    return await API_V1_logout();
  }

  public async account(): Promise<Response> {
    return await API_V1_account();
  }
}
