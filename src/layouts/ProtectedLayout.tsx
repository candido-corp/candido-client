import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '@/components/Common/Header/Header';

const ProtectedLayout = () => {
  // Usa il loader per verificare l'autenticazione
  useLoaderData();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
