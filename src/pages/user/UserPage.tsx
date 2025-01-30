import PageContent from '@/components/Common/PageContent';
import User from '@/components/User/User';
import { useTranslation } from 'react-i18next';

const UserPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('user.title')}>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/95 p-10">
            <User />
          </div>
          <div className="aspect-video rounded-xl bg-muted/95" />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="flex-1 rounded-xl bg-muted/95">
            <div className="flex flex-wrap items-center gap-4 p-10"></div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default UserPage;
