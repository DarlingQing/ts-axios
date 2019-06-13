import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfg from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
/**
 * 混合对象方法，将原型对象和混合对象属性以及方法合并
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 目的：执行instance函数时，调用request方法时，this指向axios的实例，可以直接调用axios({})该方法
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 调研createInstance方法，创建一个新的axios对象，并把defaults和config合并，作为新的默认配置
axios.create = function create(config) {
  return createInstance(mergeConfg(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
