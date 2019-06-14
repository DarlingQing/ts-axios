import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import CancelToken from '../cancel/CancelToken'
import { isURLSameOrigin } from '../helpers/ulr'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    // 创建XMLHttpRequest实例对象
    const request = new XMLHttpRequest()

    // 执行request.open()方法初始化
    request.open(method.toUpperCase(), url!, true)

    // 配置request对象
    configureRequest()

    // 添加事件处理函数
    addEvents()

    // 处理请求headers
    processHeaders()

    // 处理请求取消逻辑
    processCancel()

    // 执行request.send()方法
    request.send(data)

    function configureRequest(): void {
      // 响应类型配置处理
      if (responseType) {
        request.responseType = responseType
      }

      // 超时配置处理
      if (timeout) {
        request.timeout = timeout
      }

      // 跨域配置处理
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      // 请求错误处理
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      // 超时错误处理
      request.ontimeout = function handleTimeout() {
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData) {
        delete headers['Contnt-Type']
      }

      if (withCredentials || (isURLSameOrigin(url!) && xsrfCookieName)) {
        const xsrfValue = cookie.read(xsrfCookieName!)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      // 验证用户代理身份的凭证
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // 取消请求操作处理
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          // catch时能捕获到错误处理
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status === 0) {
        return
      }
      // 对于响应状态码不在200-300区间的，都视为响应失败
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
