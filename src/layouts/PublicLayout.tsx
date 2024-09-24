import MainNavigation from '@/components/Common/MainNavigation';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
