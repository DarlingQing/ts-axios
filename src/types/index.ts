
export type Method = 'get' | 'GET'
  |'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

/**
 * 定义请求类型配置项
 */
export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  headers?: any;
  data?: any;
  params?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

/**
 * 定义响应类型配置
 */
export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

/**
 * 定义响应类型为promise类型
 */
export interface AxiosPromise extends Promise<AxiosResponse> {}

/**
 * 定义错误类型
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;
  isAxiosError: boolean;
}
