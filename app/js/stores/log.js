import Dispatcher from '../dispatcher'

class Log {
  constructor(id, name, message) {
    this.id_ = id
    this.date_ = new Date
    this.name_ = name
    this.message_ = message
  }
  id() {
    return this.id_
  }
  timestamp() {
    const pad = n => n < 10 ? '0' + n : '' + n
    return pad(this.date_.getHours()) + ':' + pad(this.date_.getMinutes()) + ':' + pad(this.date_.getSeconds())
  }
  date() {
    return this.date_
  }
  name() {
    return this.name_
  }
  message() {
    return this.message_
  }
}

export class SystemLog extends Log {
  constructor(id, message) {
    super(id, '', message)
  }
}

export class ChatLog extends Log {}

export class LogStore extends Dispatcher {
  constructor(dispatcher) {
    super()
    this.id_ = 0
    this.logs_ = []
    dispatcher.register('message', this.onMessage.bind(this))
    dispatcher.register('chat', this.onChat.bind(this))
  }
  logs() {
    return this.logs_
  }
  onMessage(payload) {
    this.logs_.push(new SystemLog(this.id_++, payload.Message))
    this.dispatch('change')
  }
  onChat(payload) {
    this.logs_.push(new ChatLog(this.id_++, payload.ClientName, payload.Message))
    this.dispatch('change')
  }
}
