export default class Dispatcher {
  constructor() {
    this.id_ = 0
    this.handlers_ = new Map
  }
  register(type, handler) {
    if (!this.handlers_.has(type)) {
      this.handlers_.set(type, new Map)
    }
    const id = this.id_++
    this.handlers_.get(type).set(id, handler)
    return id
  }
  unregister(type, id) {
    if (!this.handlers_.has(type)) {
      return
    }
    this.handlers_.get(type).delete(id)
  }
  dispatch(type, payload) {
    if (!this.handlers_.has(type)) {
      return
    }
    for (const handler of this.handlers_.get(type).values()) {
      handler.call(this, payload)
    }
  }
}
