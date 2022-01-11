import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const Api = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export async function GET(
  address: string,
  params: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<unknown> {
  const response = await caller('get', address, {
    params,
    paramsSerializer: qs.stringify,
    ...config,
  });
  return response.data;
}

export async function PUT(
  address: string,
  params: Record<string, unknown> = {},
  fullResponse?: boolean
): Promise<unknown> {
  const response = await caller('put', address, params);
  if (fullResponse) {
    return response;
  }
  return response.data;
}

export async function POST(
  address: string,
  params: FormData | Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<unknown> {
  const response = await caller('post', address, params, config);
  return response.data;
}

export async function PATCH(address: string, params: Record<string, unknown> = {}): Promise<unknown> {
  const response = await caller('patch', address, params);
  return response.data;
}

export async function DELETE(address: string, params: Record<string, unknown> = {}): Promise<unknown> {
  const response = await caller('delete', address, params);
  return response.data;
}

export async function caller(
  method: string,
  address: string,
  params: AxiosRequestConfig | FormData | Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<{ data: unknown }> {
  // @ts-ignore
  const response = await Api[method](address, params, config).catch((error: Record<string, unknown>) => {
    if (error.response) {
      throw error.response;
    }
    throw error;
  });
  return response;
}
