import Dispatcher from './dispatcher'

export default class Action extends Dispatcher {
  constructor(url) {
    super()
    this.ws_ = new WebSocket(url)
    this.ws_.onopen    = this.onopen.bind(this)
    this.ws_.onmessage = this.onmessage.bind(this)
    this.ws_.onerror   = this.onerror.bind(this)
    this.ws_.onclose   = this.onclose.bind(this)
    this.activeUnitID_ = null
    document.addEventListener('keypress', e => {
      switch (e.keyCode) {
      case 113: // Q
        this.ability('Q', this.activeUnitID_)
        break
      case 119: // W
        this.ability('W', this.activeUnitID_)
        break
      case 101: // E
        this.ability('E', this.activeUnitID_)
        break
      case 114: // R
        this.ability('R', this.activeUnitID_)
        break
      case 32: // Space
        this.interrupt()
        break
      }
    })
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
      case 'Level':
        this.dispatch('level', frame.Data)
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
    this.dispatch('message', {
      Message: 'ERROR: Lost connection'
    })
  }
  onerror(e) {
    console.log('error', e)
  }
  write(type, data) {
    const json = JSON.stringify({
      Type: type,
      Data: data
    })
    console.log(json)
    this.ws_.send(json)
  }
  activateUnit(id) {
    this.activeUnitID_ = id
  }
  deactivateUnit(id) {
    this.activeUnitID_ = null
  }
  profile(userName) {
    this.write('Profile', {UserName: userName})
  }
  chat(message) {
    this.write('Chat', {Message: message})
  }
  level(levelID) {
    this.write('Level', {LevelID: levelID})
  }
  join(className) {
    this.write('Join', {ClassName: className})
  }
  leave() {
    this.write('Leave', {})
  }
  ability(abilityName, objectUnitID) {
    this.write('Ability', {
      AbilityName: abilityName,
      ObjectUnitID: objectUnitID
    })
  }
  interrupt() {
    this.write('Interrupt', {})
  }
}
