import ConfigApp from '@/config/ConfigApp';
import { useAuth } from '@/hooks/useAuth';
import { AuthContextType } from '@/providers/AuthProvider';
import { router } from '@/router/router';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useNotification } from './hooks/useNotification';
import { NotificationContextType } from './providers/NotificationProvider';

function App() {
  console.log(ConfigApp);
  const authContext: AuthContextType = useAuth();
  const notificationContext: NotificationContextType = useNotification();
  const appRouter = router(authContext, notificationContext);

  return (
    <Suspense fallback="...is loading">
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
