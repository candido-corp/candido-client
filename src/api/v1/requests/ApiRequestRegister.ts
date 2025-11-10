export enum RequestRegisterType {
  EMAIL = 'email',
  CODE = 'code',
}

export type ApiRequestRegister = {
  email?: string;
  password?: string;
  confirm_password?: string;
  first_name?: string;
  last_name?: string;
  a: RequestRegisterType;
};
