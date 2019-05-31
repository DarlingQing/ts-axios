import { AxiosRequestConfig, AxiosPromise } from './types';
import xhr from './xhr';
import { buildURL } from './helpers/ulr';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/headers';

function axios (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config);
}

/**
 * 处理配置函数
 * @param config 配置参数
 */
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}


/**
 * 配置参数url处理
 * @param config 配置参数
 */
function transformUrl (config: AxiosRequestConfig): string {
  const { url, params} = config
  return buildURL(url, params);
}


/**
 * 配置参数data部分数据
 * @param config 配置参数
 */
function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

/**
 * 配置参数headers部分
 * @param config 配置参数
 */
function transformHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

export default axios;
