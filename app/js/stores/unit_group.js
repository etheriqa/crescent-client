import Dispatcher from '../dispatcher'
import UnitStore from './unit'

export default class UnitGroupStore extends Dispatcher {
  constructor(action, unitGroup) {
    super()
    this.action_ = action
    this.unitGroup_ = unitGroup
    this.units_ = []

    this.action_.register('unitJoin', this.onJoin.bind(this))
    this.action_.register('unitLeave', this.onLeave.bind(this))
  }
  unitGroup() { return this.unitGroup_ }
  units()     { return this.units_ }
  onJoin(payload) {
    if (payload.UnitGroup !== this.unitGroup_) {
      return
    }
    this.units_.push(new UnitStore(this.action_, payload))
    this.dispatch('change')
  }
  onLeave(payload) {
    let change = false
    this.units_= this.units_.filter(unit => {
      if (unit.unitID() !== payload.UnitID) {
        return true
      }
      change = true
      return false
    })
    if (change) {
      this.dispatch('change')
    }
  }
}
