import { Outlet, useLoaderData } from 'react-router-dom';
import MainNavigation from '@/components/Common/MainNavigation';

const ProtectedLayout = () => {
  // Usa il loader per verificare l'autenticazione
  useLoaderData();

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
