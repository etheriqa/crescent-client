import Dispatcher from '../dispatcher'

export default class PlayerAbilityStore extends Dispatcher {
  constructor(action, key, payload) {
    super()
    this.action_             = action
    this.key_                = key
    this.name_               = payload.Name
    this.description_        = payload.Description
    this.targetType_         = payload.TargetType
    this.healthCost_         = payload.HealthCost
    this.manaCost_           = payload.ManaCost
    this.activationDuration_ = payload.ActivationDuration
    this.cooldownDuration_   = payload.CooldownDuration
    this.disableTypes_       = payload.DisableTypes
    this.cooldownEndTime_    = null

    this.action_.register('unitCooldown', this.onCooldown.bind(this))
  }
  key()                { return this.key_ }
  name()               { return this.name_ }
  description()        { return this.description_ }
  targetType()         { return this.targetType_ }
  healthCost()         { return this.healthCost_ }
  manaCost()           { return this.manaCost_ }
  activationDuration() { return this.activationDuration_ }
  cooldownDuration()   { return this.cooldownDuration_ }
  disableTypes()       { return this.disableTypes_ }
  cooldownEndTime()    { return this.cooldownEndTime_ }
  isCooldown() {
    return this.cooldownEndTime_ !== null
  }
  onCooldown(payload) {
    if (payload.AbilityName !== this.name_) {
      return
    }
    if (payload.Active) {
      this.cooldownEndTime_ = payload.ExpirationTime
    } else {
      this.cooldownEndTime_ = null
    }
    this.dispatch('change')
  }
}
