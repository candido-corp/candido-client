import { buttonVariants } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Link } from 'react-router-dom';

type AuthContainerProps = {
  title: string;
  description?: string;
  formComponent: React.ReactNode;
  linkText: string;
  linkTo: string;
} & BaseFC;

export const AuthContainer: React.FC<AuthContainerProps> = ({
  title,
  description,
  formComponent,
  linkText,
  linkTo,
}) => {
  return (
    <div className="container relative flex h-svh flex-col justify-center sm:items-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to={linkTo}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        {linkText}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          to={EnumRoutes.HOME}
          className="relative z-20 flex w-fit items-center p-4 text-lg font-bold text-primary"
        >
          Candido
        </Link>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-14 w-14"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-balance text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {formComponent}
        </div>
      </div>
    </div>
  );
};
