import WithAuthorization from '@/components/Common/WithAuthorization';
import {
  EnumUserPermissions,
  EnumUserRoles,
} from '@/models/enums/EnumUsers.ts';
import { ResetPasswordButton } from './ResetPasswordButton';

const User = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* <p className="text-sm">
        {userData.first_name}&nbsp;{userData.last_name}
      </p>
      <p className="text-sm">{userData.email}</p> */}
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
