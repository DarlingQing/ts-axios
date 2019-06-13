import { AxiosTransformer } from '../types'
import Axios from './Axios'

/**
 * 处理转换函数的逻辑
 * @param data 请求数据
 * @param headers 请求headers
 * @param fns 一个或多个转换函数
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  // 把转换函数全部转换成数组，统一进行遍历逻辑
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 每一个转换函数，实现管道式和链式调用逻辑
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
