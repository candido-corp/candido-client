import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { useFetcher } from 'react-router-dom';

const LogoutForm: React.FC<BaseFC> = ({ className, children }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      action={EnumRoutes.LOGOUT}
      method="post"
      className={cn(className, 'w-full')}
    >
      <button
        type="submit"
        className="flex w-full items-center gap-2"
        onClick={(e) => fetcher.submit(e.currentTarget.form)}
      >
        {children}
      </button>
    </fetcher.Form>
  );
};

export default LogoutForm;
