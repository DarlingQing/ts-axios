const toString = Object.prototype.toString

/**
 * 判断一个值是否是日期类型
 * @param val 传入的值
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断一个值是否是对象
 * @param val 传入的值
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 判断一个纯的普通对象是否是对象
 * @param val 传入的值
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 判断一个值是不是formData类型
 * @param val 传入的值
 */
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
/**
 * 对象扩展到第一个对象上
 * @param to 扩展到的目标对象
 * @param from 需要被扩展的对象
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 *
 * @param objs 可能是多个参数
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // console.log(val);
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
