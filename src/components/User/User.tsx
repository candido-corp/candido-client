import { useLoaderData } from 'react-router-dom';
import { ApiResponseAccount } from '@/api/v1/responses/ApiResponseAccount.ts';
import {
  EnumUserPermissions,
  EnumUserRoles,
} from '@/models/enums/EnumUsers.ts';
import WithAuthorization from '@/components/Common/WithAuthorization';
import { ResetPasswordButton } from '../ResetPasswordButton';

const User = () => {
  const data = useLoaderData() as ApiResponseAccount;

  return (
    <div className="flex flex-col gap-3">
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
const UserComponentWithAuthorization = WithAuthorization(
  allowedRoles,
  allowedPermissions
)(User);
export default UserComponentWithAuthorization;
