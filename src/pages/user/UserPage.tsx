import PageContent from '@/components/Common/PageContent';
import { ApplicationsBox } from '@/components/user/ApplicationsBox';
import { UserInfoCard } from '@/components/user/UserInfoCard';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { User } from '@/models/interfaces/User';
import { LOADER_USER_ID } from '@/router/loaders/loaderUser';
import { MapPin, User as UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router-dom';

const UserPage = () => {
  const { t } = useTranslation();
  const userData = useRouteLoaderData(LOADER_USER_ID) as User;

  return (
    <PageContent title={t('user.title', { name: userData.first_name })}>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <UserInfoCard
          title="User Information"
          value={`${userData.first_name} ${userData.last_name}`}
          label={userData.email}
          icon={<UserIcon className="h-5 w-5" />}
          linkTo={EnumRoutes.USER_DETAILS}
        />

        <UserInfoCard
          title="Addresses"
          value={userData.address ? userData.address.street : 'No address'}
          label={userData.address ? '1 default address' : 'No addresses added'}
          icon={<MapPin className="h-5 w-5" />}
          linkTo={EnumRoutes.USER_ADDRESSES}
        />
        {/* <div className="flex rounded-xl bg-muted/95 p-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              {userData.first_name}&nbsp;{userData.last_name}
            </p>
            <p className="text-sm">{userData.email}</p>
            <p>
              <ResetPasswordButton className="mt-1" />
              </p>
            <Button className="mt-1">
              <Link to={EnumRoutes.USER_PERSONAL_DATA}>Modify your data</Link>
              <ArrowDownRight />
            </Button>
          </div>
        </div>
        <div className="flex rounded-xl bg-muted/95 p-10">
          <div className="flex flex-col gap-3">
            {userData.address ? (
              <p className="text-sm">addddress</p>
            ) : (
              <p className="text-sm">No address</p>
            )}
          </div>
        </div> */}
      </div>
      <ApplicationsBox />
    </PageContent>
  );
};

export default UserPage;
