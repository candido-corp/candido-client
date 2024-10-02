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
