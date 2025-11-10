import { Outlet, useLoaderData } from 'react-router-dom';

const ProtectedLayout = () => {
  // Usa il loader per verificare l'autenticazione
  useLoaderData();

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
