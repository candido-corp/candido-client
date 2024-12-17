import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from '@/router/router';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { useToast } from './components/ui/use-toast';

function App() {
  const authContext: AuthContextType = useAuth();
  const { toast } = useToast();
  const appRouter = router(authContext, toast);

  return (
    <Suspense fallback="...is loading">
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
