import Dispatcher from '../dispatcher'
import UnitStore from './unit'

export const UNIT_GROUP_PLAYER = 1
export const UNIT_GROUP_AI     = 2

export default class UnitGroupStore extends Dispatcher {
  constructor(action, unitGroup) {
    super()
    this.action_ = action
    this.unitGroup_ = unitGroup
    this.units_ = []

    this.action_.register('level', this.onLevel.bind(this))
    this.action_.register('unitJoin', this.onJoin.bind(this))
    this.action_.register('unitLeave', this.onLeave.bind(this))
  }
  unitGroup() { return this.unitGroup_ }
  units()     { return this.units_ }
  onLevel(payload) {
    this.units_ = []
    this.dispatch('change')
  }
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
