import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response);
    }

    // 请求报错处理
    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }

    // 请求超时处理
    request.ontimeout = function handleTimeout() {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })

    request.send(data);

    function handleResponse(response: AxiosResponse) {
      if (response.status === 0) {
        return;
      }
      // 对于响应状态码不在200-300区间的，都视为响应失败
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request, 
          response
        ))
      }
    }

  })
  
}