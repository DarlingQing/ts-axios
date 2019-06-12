import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/util'
import defaults from './default'
/**
 * 混合对象方法，将原型对象和混合对象属性以及方法合并
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 目的：执行instance函数时，调用request方法时，this指向axios的实例，可以直接调用axios({})该方法
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
