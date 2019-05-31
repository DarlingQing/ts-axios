const toString = Object.prototype.toString;

/**
 * 判断一个值是否是日期类型
 * @param val 传入的值
 */
export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

/**
 * 判断一个值是否是对象
 * @param val 传入的值
 */
export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object';
}

/**
 * 判断一个纯的普通对象是否是对象
 * @param val 传入的值
 */
export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]';
}