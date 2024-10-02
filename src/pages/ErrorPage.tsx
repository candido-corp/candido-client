import PageContent from '@/components/Common/PageContent';
import { AxiosApiErrorResponse } from '@/utils/errors';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    if (error.data && error.data.axiosError) {
      const errorResponse: AxiosApiErrorResponse = error.data.error;
      message = errorResponse.errors.map((error) => error.message).join(', ');
    } else {
      message = error.data;
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
      </PageContent>
    </>
  );
}

export default ErrorPage;
