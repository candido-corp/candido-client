import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from '@/router/router';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { useAuth } from '@/hooks/useAuth.ts';

function App() {
  const authContext: AuthContextType = useAuth();
  const appRouter = router(authContext);

  return (
    <Suspense fallback="...is loading">
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
