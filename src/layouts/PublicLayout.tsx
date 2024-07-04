import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="h-full">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
