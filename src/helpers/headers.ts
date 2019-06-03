import { isPlainObject } from './util';

/**
 * 处理请求头部大小点不敏感的参数，统一进行处理，例如content-type,Content-type等，统一转换成Content-Type
 * @param headers 请求头部
 * @param normalizeName 需要进行大小写的参数名称
 */
function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  })
}

/**
 * 对请求参数的headers部分做处理
 * @param headers 请求配置头部
 * @param data 请求数据对象data
 */
export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

/**
 * 将响应的headers字段从字符串解析成对象结构
 * @param headers 需要进行处理的响应headers字段
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return;
  }
  headers.split('\r\n').forEach(line => {
    // 这里会存在一个问题，如果是时间的话，会被遗弃去除掉
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })
  return parsed;
}