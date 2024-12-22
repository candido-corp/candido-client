import { Outlet, useLoaderData } from 'react-router-dom';
import { AppSidebarProvider } from '@/components/Common/AppSidebar/AppSidebarProvider';

const ProtectedLayout = () => {
  // Usa il loader per verificare l'autenticazione
  useLoaderData();

  return (
    <>
      <AppSidebarProvider>
        <main>
          <Outlet />
        </main>
      </AppSidebarProvider>
    </>
  );
};

export default ProtectedLayout;
