import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from '@/router/router';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import ConfigApp from '@/config/ConfigApp.ts';

function App() {
  console.log(ConfigApp)
  const authContext: AuthContextType = useAuth();
  const appRouter = router(authContext);

  return (
    <Suspense fallback="...is loading">
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
