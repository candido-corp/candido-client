import { useLoaderData } from 'react-router-dom';
import { ApiResponseAccount } from '@/api/v1/responses/ApiResponseAccount.ts';
import {
  EnumUserPermissions,
  EnumUserRoles,
} from '@/models/enums/EnumUsers.ts';
import WithAuthorization from '@/components/Common/WithAuthorization';
import { ResetPasswordButton } from './ResetPasswordButton';

const Account = () => {
  const data = useLoaderData() as ApiResponseAccount;

  return (
    <div>
      <p>Email: {data.email}</p>
      <p>Status: {data.status}</p>
      <p>
        <ResetPasswordButton />
      </p>
    </div>
  );
};

const allowedRoles = [EnumUserRoles.USER_VERIFIED];
const allowedPermissions = [EnumUserPermissions.USER_READ];
const AccountComponentWithAuthorization = WithAuthorization(
  allowedRoles,
  allowedPermissions
)(Account);
export default AccountComponentWithAuthorization;
