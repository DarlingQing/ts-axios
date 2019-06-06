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
