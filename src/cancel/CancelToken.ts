import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  resaon?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      // resolvePromise函数指向resolve，目的让promise从pending状态变成resolve状态
      resolvePromise = resolve
    })
    executor(message => {
      // 防止多次调用
      if (this.resaon) {
        return
      }
      this.resaon = new Cancel(message)
      resolvePromise(this.resaon)
    })
  }

  throwIfRequested() {
    if (this.resaon) {
      throw this.resaon
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
