import { NotificationContextType } from '@/providers/NotificationProvider';
import { AxiosError } from 'axios';
import { json } from 'react-router-dom';

export type AxiosApiErrorResponse = {
  errors: ApiError[];
  status: number;
  timestamp: string;
};

type ApiError = {
  code: string;
  message: string;
};

export const handleLoaderError = (error: unknown) => {
  let data: string | object = 'An unexpected error occurred';
  let status = 500;
  if (error instanceof AxiosError && error.response) {
    data = {
      error: error.response.data as AxiosError<AxiosApiErrorResponse>,
      axiosError: true,
    };
    status = error.response.status;
  }
  throw json(data, status);
};

/**
 * Handles action errors in a centralized way
 * @param error The caught error
 * @param defaultMessage Default error message for this type of action
 * @param toast Toast function from the NotificationProvider context
 * @param title Toast title (optional)
 */
export const handleActionError = (
  error: unknown,
  defaultMessage: string,
  toast: NotificationContextType['toast'],
  title: string = 'Oops, something went wrong'
): void => {
  console.error('error:', error);

  let errorDescription = defaultMessage;

  // Checks if it is an AxiosError and has an API message
  if (error instanceof AxiosError && error.response) {
    const apiErrorResponse: AxiosApiErrorResponse = error.response.data;
    if (apiErrorResponse?.errors?.length > 0) {
      // Joins all error messages, separating them with a newline
      errorDescription = apiErrorResponse.errors
        .map((error) => error.message)
        .join('\n');
    }
  }

  toast({
    variant: 'destructive',
    title,
    description: errorDescription,
    duration: 3000,
  });
};
