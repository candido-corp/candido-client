import { RequestLoginData } from '../../models/requests/RequestLoginData';
import { RequestRegisterData } from '../../models/requests/RequestRegisterData';
import { RequestRegisterVerifyByEmailData } from '../../models/requests/RequestRegisterVerifyByEmailData';

export interface AuthServiceInterface {
  registerEmailVerification(data: RequestRegisterData): Promise<Response>;
  registerVerifyByEmail(
    data: RequestRegisterVerifyByEmailData
  ): Promise<Response>;
  login(data: RequestLoginData): Promise<Response>;
  logout(): Promise<Response>;
}
