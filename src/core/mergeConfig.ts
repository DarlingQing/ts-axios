import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// 合并策略的map
const strats = Object.create(null)

// 默认的合并策略
function defaultStrat(val1: any, val2: any): any {
  // console.log(val2);
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只接受自定义配置合并策略
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 复杂对象合并
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const stratkeysFromVal2 = ['url', 'params', 'data']

stratkeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfg(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 承接合并的结果
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  /**
   * @param key 对key值做遍历
   */
  function mergeField(key: string): void {
    // 确定用哪种合并策略
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  // console.log(config);
  return config
}
