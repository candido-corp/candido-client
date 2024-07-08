import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import NetworkClient from '@/api/v1/NetworkClient.ts';

type Method = 'get' | 'post' | 'put' | 'delete';

const commonSystemErrors = [
  'EACCES',
  'EADDRINUSE',
  'ECONNREFUSED',
  'ECONNRESET',
  'EEXIST',
  'EISDIR',
  'EMFILE',
  'ENOENT',
  'ENOTDIR',
  'ENOTEMPTY',
  'ENOTFOUND',
  'EPERM',
  'EPIPE',
  'ETIMEDOUT',
];

interface DecoratorConfig {
  url: string;
  method: Method;
  headers?: Record<string, string>;
}

interface RequestOptions {
  data?: never;
  params?: Record<string, any>;
  axiosConfig?: AxiosRequestConfig;
}

function createDecorator({ url, method, headers }: DecoratorConfig) {
  return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {

    descriptor.value = async function (options: RequestOptions = {}): Promise<any> {
      const { data, params, axiosConfig = {} } = options;

      console.info('CALL -> Data:', data, '| Params:', params, '| AxiosConfig:', axiosConfig);

      const customHeader = {
        'Content-Type': 'application/json',
        ...headers,
        ...axiosConfig.headers,
      };

      const config: AxiosRequestConfig = {
        url,
        method,
        headers: customHeader,
        data: method === 'post' || method === 'put' ? data : undefined,
        params: method === 'get' || method === 'delete' ? params : undefined,
        ...axiosConfig,
      };

      const client = NetworkClient.client || axios;
      let response: AxiosResponse = {} as AxiosResponse;

      try {
        response = await client(config);
      } catch (error: any) {
        // TODO: Handle error, remove this line
        if(error) console.log(error)

        if (
          error &&
          error.cause &&
          'code' in error.cause &&
          commonSystemErrors.includes(error.cause.code)
        ) {
          throw new Error('Connection refused');
        }

        if (axios.isAxiosError(error) && error.response?.data) {
          console.error(JSON.stringify(error.response.data));
          throw new Error(error.response.data.message || 'API error');
        }

        console.error(error.response?.data || 'No data in error response');
        throw new Error('Unknown error');
      }

      return response;
    };

    return descriptor;
  };
}

export function POST(url: string, headers: Record<string, string> = {}) {
  return createDecorator({ url, method: 'post', headers });
}

export function GET(url: string, headers: Record<string, string> = {}) {
  return createDecorator({ url, method: 'get', headers });
}

export function PUT(url: string, headers: Record<string, string> = {}) {
  return createDecorator({ url, method: 'put', headers });
}

export function DELETE(url: string, headers: Record<string, string> = {}) {
  return createDecorator({ url, method: 'delete', headers });
}
