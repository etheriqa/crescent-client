export default class Dispatcher {
  constructor() {
    this.handlers_ = {}
  }
  register(type, handler) {
    if (typeof this.handlers_[type] === 'undefined') {
      this.handlers_[type] = []
    }
    this.handlers_[type].push(handler)
  }
  dispatch(type, payload) {
    if (typeof this.handlers_[type] === 'undefined') {
      return
    }
    for (const handler of this.handlers_[type]) {
      handler.call(this, payload)
    }
  }
}
