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