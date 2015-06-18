import Dispatcher from '../dispatcher'

export default class UnitStore extends Dispatcher {
  constructor(action, payload) {
    super()
    this.action_    = action
    this.unitID_    = payload.UnitID
    this.unitGroup_ = payload.UnitGroup
    this.unitName_  = payload.UnitName
    this.className_ = payload.ClassName
    this.health_    = payload.Health
    this.healthMax_ = payload.HealthMax
    this.mana_      = payload.Mana
    this.manaMax_   = payload.ManaMax

    this.action_.register('unitResource', this.onResource.bind(this))
  }
  unitID()    { return this.unitID_ }
  unitGroup() { return this.unitGroup_ }
  unitName()  { return this.unitName_ }
  className() { return this.className_ }
  health()    { return this.health_ }
  healthMax() { return this.healthMax_ }
  mana()      { return this.mana_ }
  manaMax()   { return this.manaMax_ }
  onResource(payload) {
    if (payload.UnitID !== this.unitID_) {
      return
    }
    this.health_ = payload.Health
    this.mana_   = payload.Mana
    this.dispatch('change')
  }
}
