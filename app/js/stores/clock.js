import Dispatcher from '../dispatcher'

const GAME_TICK = 50

export default class Clock extends Dispatcher {
  constructor(action) {
    super()
    this.action_ = action
    this.instanceTime_  = null
    this.clientTime_    = null
    this.lastUpdatedAt_ = null

    this.action_.register('sync', this.onSync.bind(this))
    global.setInterval(this.updateClientTime.bind(this), 10)
  }
  now() { return this.clientTime_ }
  updateClientTime() {
    if (this.instanceTime_ === null || this.clientTime_ === null || this.lastUpdatedAt_ === null) {
      return
    }
    const before = this.clientTime_
    const after = this.instanceTime_ + Math.floor((new Date - this.lastUpdatedAt_) / GAME_TICK)
    if (before === after) {
      return
    }
    this.clientTime_ = after
    this.dispatch('change')
  }
  onSync(payload) {
    this.instanceTime_  = payload.InstanceTime
    this.clientTime_    = payload.Instancetime
    this.lastUpdatedAt_ = new Date

    this.updateClientTime()
  }
}
