import { AxiosRequestConfig, AxiosResponse } from "../types";

/**
 * 创建从基础AxiosError类
 */
export class AxiosError extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);
    this.isAxiosError = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    // 为了解决 TypeScript 继承一些内置对象的时候的坑
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

/**
 * 创建错误属性
 * @param message 
 * @param config 
 * @param code 
 * @param request 
 * @param response 
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response);
  return error;
}