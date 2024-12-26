import Header from '@/components/Common/Header/Header';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      {/* <AppSidebarProvider> */}
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
