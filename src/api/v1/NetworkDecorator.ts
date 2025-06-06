import NetworkClient from '@/api/v1/NetworkClient.ts';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete';

interface DecoratorConfig {
  url: string;
  method: Method;
  headers?: Record<string, string>;
}

interface RequestOptions {
  data?: never;
  params?: Record<string, any>;
  pathParams?: Record<string, string | number>;
  axiosConfig?: AxiosRequestConfig;
}

function createDecorator({ url, method, headers }: DecoratorConfig) {
  return function (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = async function (
      options: RequestOptions = {}
    ): Promise<any> {
      const { data, params, pathParams, axiosConfig = {} } = options;

      console.info(
        'CALL -> Data:',
        data,
        '| Params:',
        params,
        '| PathParams:',
        pathParams,
        '| AxiosConfig:',
        axiosConfig
      );

      // Replace path parameters in URL
      let finalUrl = url;
      if (pathParams) {
        Object.entries(pathParams).forEach(([key, value]) => {
          finalUrl = finalUrl.replace(`:${key}`, String(value));
        });
      }

      const customHeader = {
        'Content-Type': 'application/json',
        ...headers,
        ...axiosConfig.headers,
      };

      const config: AxiosRequestConfig = {
        url: finalUrl,
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
        console.log(error);
        throw error;
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
