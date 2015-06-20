import Dispatcher from '../dispatcher'

export default class UnitResourceLogStore extends Dispatcher {
  constructor(action, unitID) {
    super()
    this.unitID_ = unitID
    this.id_ = 0
    this.logs_ = new Map

    action.register('damage', this.onDamage.bind(this))
    action.register('healing', this.onHealing.bind(this))
  }
  logs() {
    return this.logs_.values()
  }
  onDamage(payload) {
    if (payload.ObjectUnitID !== this.unitID_) {
      return
    }
    const id = this.id_++
    this.logs_.set(id, {
      id: id,
      type: 'damage',
      amount: payload.Damage,
      isCritical: payload.IsCritical,
    })
    global.setTimeout(this.remove.bind(this, id), 3000)
    this.dispatch('change')
  }
  onHealing(payload) {
    if (payload.ObjectUnitID !== this.unitID_) {
      return
    }
    const id = this.id_++
    this.logs_.set(id, {
      id: id,
      type: 'healing',
      amount: payload.Healing,
      isCritical: payload.IsCritical,
    })
    global.setTimeout(this.remove.bind(this, id), 3000)
    this.dispatch('change')
  }
  remove(id) {
    this.logs_.delete(id)
    this.dispatch('change')
  }
}
