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
      case 'Stage':
        this.dispatch('stage', frame.Data)
        break
      case 'Player':
        this.dispatch('player', frame.Data)
        break
      case 'UnitJoin':
        this.dispatch('unitJoin', frame.Data)
        break
      case 'UnitLeave':
        this.dispatch('unitLeave', frame.Data)
        break
      case 'UnitAttach':
        this.dispatch('unitAttach', frame.Data)
        break
      case 'UnitDetach':
        this.dispatch('unitDetach', frame.Data)
        break
      case 'UnitActivating':
        this.dispatch('unitActivating', frame.Data)
        break
      case 'UnitActivated':
        this.dispatch('unitActivated', frame.Data)
        break
      case 'UnitCooldown':
        this.dispatch('unitCooldown', frame.Data)
        break
      case 'UnitResource':
        this.dispatch('unitResource', frame.Data)
        break
      case 'Damage':
        this.dispatch('damage', frame.Data)
        break
      case 'Healing':
        this.dispatch('healing', frame.Data)
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
    this.ws_.send(JSON.stringify({
      Type: 'Profile',
      Data: {
        UserName: userName
      }
    }))
  }
  chat(message) {
    this.ws_.send(JSON.stringify({
      Type: 'Chat',
      Data: {
        Message: message
      }
    }))
  }
  stage(stageID) {
    this.ws_.send(JSON.stringify({
      Type: 'Stage',
      Data: {
        StageID: stageID
      }
    }))
  }
  join(className) {
    this.ws_.send(JSON.stringify({
      Type: 'Join',
      Data: {
        ClassName: className
      }
    }))
  }
  leave() {
    this.ws_.send(JSON.stringify({
      Type: 'Leave',
      Data: {}
    }))
  }
  ability(abilityName, objectUnitID) {
    this.ws_.send(JSON.stringify({
      Type: 'Ability',
      Data: {
        AbilityName: abilityName,
        ObjectUnitID: objectUnitID
      }
    }))
  }
  interrupt() {
    this.ws_.send(JSON.stringify({
      Type: 'Interrupt',
      Data: {}
    }))
  }
}
