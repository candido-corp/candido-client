import MainNavigation from '@/components/Common/MainNavigation';
import { Outlet } from 'react-router-dom';

type MainProps = {
  showNavigation?: boolean;
};

const Main: React.FC<MainProps> = ({ showNavigation = true }) => {
  return (
    <>
      {showNavigation && <MainNavigation />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;
