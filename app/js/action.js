import Dispatcher from './dispatcher'

export default class Action extends Dispatcher {
  constructor(url) {
    super()
    this.ws_ = new WebSocket(url)
    this.ws_.onopen    = this.onopen.bind(this)
    this.ws_.onmessage = this.onmessage.bind(this)
    this.ws_.onerror   = this.onerror.bind(this)
    this.ws_.onclose   = this.onclose.bind(this)
  }
  onopen(e) {
    console.log('open', e)
  }
  onmessage(e) {
    console.log('message', e)
    const frame = JSON.parse(e.data)
    switch (frame.Type) {
      case 'Sync':
        this.dispatch('sync', frame.Data)
        break
      case 'Message':
        this.dispatch('message', frame.Data)
        break
      case 'Chat':
        this.dispatch('chat', frame.Data)
        break
      case 'UnitJoin':
        this.dispatch('unitJoin', frame.Data)
        break
      case 'UnitLeave':
        this.dispatch('unitLeave', frame.Data)
        break
      case 'UnitResource':
        this.dispatch('unitResource', frame.Data)
        break
      case 'UnitActivating':
        this.dispatch('unitActivating', frame.Data)
        break
      case 'UnitActivated':
        this.dispatch('unitActivated', frame.Data)
        break
    }
  }
  onclose(e) {
    console.log('close', e)
  }
  onerror(e) {
    console.log('error', e)
  }
  profile(userName) {
    ws.send(JSON.stringify({
      Type: 'Profile',
      Data: {
        UserName: userName
      }
    }))
  }
  chat(message) {
    ws.send(JSON.stringify({
      Type: 'Chat',
      Data: {
        Message: message
      }
    }))
  }
  stage(stageID) {
    ws.send(JSON.stringify({
      Type: 'Stage',
      Data: {
        StageID: stageID
      }
    }))
  }
  join(className) {
    ws.send(JSON.stringify({
      Type: 'Join',
      Data: {
        ClassName: className
      }
    }))
  }
  leave() {
    ws.send(JSON.stringify({
      Type: 'Leave',
      Data: {}
    }))
  }
  ability() {
    ws.send(JSON.stringify({
      Type: 'Ability',
      Data: {
        AbilityName: abilityName,
        ObjectUnitID: objectUnitID
      }
    }))
  }
  interrupt() {
    ws.send(JSON.stringify({
      Type: 'Interrupt',
      Data: {}
    }))
  }
}
