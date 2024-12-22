import { AppSidebarProvider } from '@/components/Common/AppSidebar/AppSidebarProvider';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <AppSidebarProvider>
        <main className="h-full">
          <Outlet />
        </main>
      </AppSidebarProvider>
    </>
  );
};

export default PublicLayout;
