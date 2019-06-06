import { isPlainObject } from './util';

/**
 * 对请求参数的data部分做处理
 * @param data 请求数据对象data
 */
export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

/**
 * 将服务端返回的字符串类型转换成JSON对象
 * @param data 响应数据
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      // console.log(error);
    }
  }
  return data;
}