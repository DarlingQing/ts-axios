import { isCancel } from '../cancel/Cancel'

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * 定义请求类型配置项
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredebtials
  validateStatus?: (status: number) => boolean
  [propName: string]: any
}

/**
 * 定义响应类型配置
 */
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * 定义响应类型为promise类型
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 定义错误类型
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * Axios接口扩展，支持以下方法，接口并能添加泛型参数，目的：为了响应数据支持泛型
 */
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosRequestConfig>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 混合对象定义接口：支持2个参数，实现Axios方法重载
 */
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 静态接口
 * 提供create接受一个AxiosRequestConfig类型的配置
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

/**
 * 可能是任何类型的错误
 */
export interface RejectedFn {
  (error: any): any
}

/**
 * 拦截器管理对象：支持两个参数
 */
export interface AxiosInterceptorManager<T> {
  // 添加拦截器，返回一个拦截器的id，供删除使用
  use(resolved: ResolvedFn, rejected?: RejectedFn): number

  // 删除拦截器
  eject(id: number): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

/**
 * 取消请求实力类型的接口定义
 */
export interface CancelToken {
  promise: Promise<Cancel>
  resaon?: Cancel
  throwIfRequested(): void
}

/**
 * 取消方法的接口定义
 */
export interface Canceler {
  (message?: string): void
}

/**
 * CancelToken类构造函数参数的接口定义
 */
export interface CancelExecutor {
  (cancel: Canceler): void
}

/**
 * 作为CancelToken类静态方法，
 */
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

/**
 * 作为CancelToken的类类型
 */
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

/**
 * Cancel的实例类型
 */
export interface CancelStatic {
  new (message?: string): Cancel
}

/**
 * 服务器代码身份类型定义
 */
export interface AxiosBasicCredebtials {
  username: string
  password: string
}
