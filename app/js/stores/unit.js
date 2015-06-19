import Dispatcher from '../dispatcher'

export default class UnitStore extends Dispatcher {
  constructor(action, payload) {
    super()
    this.action_       = action
    this.unitID_       = payload.UnitID
    this.unitGroup_    = payload.UnitGroup
    this.unitName_     = payload.UnitName
    this.className_    = payload.ClassName
    this.health_       = payload.Health
    this.healthMax_    = payload.HealthMax
    this.mana_         = payload.Mana
    this.manaMax_      = payload.ManaMax
    this.isActivating_ = false

    this.action_.register('unitResource', this.onResource.bind(this))
    this.action_.register('unitActivating', this.onActivating.bind(this))
    this.action_.register('unitActivated', this.onActivated.bind(this))
  }
  unitID()                { return this.unitID_ }
  unitGroup()             { return this.unitGroup_ }
  unitName()              { return this.unitName_ }
  className()             { return this.className_ }
  health()                { return this.health_ }
  healthMax()             { return this.healthMax_ }
  mana()                  { return this.mana_ }
  manaMax()               { return this.manaMax_ }
  isActivating()          { return this.isActivating_ }
  activatingAbilityName() { return this.activatingAbilityName_ }
  activatingStartTime()   { return this.activatingStartTime_ }
  activatingEndTime()     { return this.activatingEndTime_ }
  onResource(payload) {
    if (payload.UnitID !== this.unitID_) {
      return
    }
    this.health_ = payload.Health
    this.mana_   = payload.Mana
    this.dispatch('change')
  }
  onActivating(payload) {
    if (payload.UnitID !== this.unitID_) {
      return
    }
    this.isActivating_          = true
    this.activatingAbilityName_ = payload.AbilityName
    this.activatingStartTime_   = payload.StartTime
    this.activatingEndTime_     = payload.EndTime
    this.dispatch('change')
  }
  onActivated(payload) {
    if (payload.UnitID !== this.unitID_) {
      return
    }
    this.isActivating_ = false
    this.dispatch('change')
  }
}
