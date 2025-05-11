export enum RequestRegisterVerifyType {
  EMAIL = 'email',
  CODE = 'code',
}

export type ApiRequestRegisterVerify = {
  t?: string;
  e?: string;
  a?: RequestRegisterVerifyType;
};
