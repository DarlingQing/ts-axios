import { isDate, isPlainObject } from './util';

/**
 * 统一对资源标识符的组成部分进行编码
 * @param val 需要进行编码的值
 */
function encord (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 对请求参数的url做处理
 * @param url 传递的url
 * @param params 拼接参数
 */
export function buildURL(url: string, params?: any) {
  if (!params) {
    return url;
  }
  const parts: string[] = [];
  Object.keys(params).forEach((key) => {
    let val = params[key];
    if (val === null || typeof val === 'undefined') {
      // forEach中写return不会跳出，会进入下一次循环
      return;
    }
    let values: string[] = [];
    // 统一用数组形式处理
    if (Array.isArray(val)) {
      values = val;
    } else {
      values = [val];
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encord(key)}=${encord(val)}`)
      // parts.push(`${key}=${val}`)
    })
  })
  let serializedParams = parts.join('&');

  //  拼接完整的url
  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}
