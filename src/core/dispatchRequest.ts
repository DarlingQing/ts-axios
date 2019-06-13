import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/ulr'
import { transformRequest, transformResponse } from '../helpers/data'
import { flatterHeaders } from '../helpers/headers'
import transform from './config'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理配置函数
 * @param config 配置参数
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  // config.headers = transformHeaders(config);
  // config.data = transformRequestData(config);
  config.headers = flatterHeaders(config.headers, config.method!)
}

/**
 * 配置参数url处理
 * @param config 配置参数
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 类型断言方式确保url是一定存在的
  return buildURL(url!, params)
}

/**
 * 配置参数data部分数据
 * @param config 配置参数
 */
// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data);
// }

/**
 * 配置参数headers部分
 * @param config 配置参数
 */
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config;
//   return processHeaders(headers, data);
// }

/**
 * 将字符串格式转船成JSON对象格式
 * @param res 处理响应数据
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  // console.log(res);
  // res.data = transformResponse(res.data);
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

/**
 * 判断token是否已经请求过
 * @param config 请求参数
 */
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
