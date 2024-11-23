import PageContent from '@/components/Common/PageContent';
import { buttonVariants } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AxiosApiErrorResponse } from '@/utils/errors';
import { cn } from '@/utils/shadcn';
import { t } from 'i18next';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    if (error.data && error.data.axiosError && error.data.error.errors) {
      const errorResponse: AxiosApiErrorResponse = error.data.error;
      message = errorResponse.errors?.map((error) => error.message).join(', ');
    }

    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
        <Link
          to={EnumRoutes.HOME}
          className={cn(buttonVariants({ variant: 'default' }), 'mt-4')}
        >
          {t('homepage.title')}
        </Link>
      </PageContent>
    </>
  );
}

export default ErrorPage;
