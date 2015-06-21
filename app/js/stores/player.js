import Dispatcher from '../dispatcher'
import PlayerAbilityStore from './player_ability'

export default class PlayerStore extends Dispatcher {
  constructor(action, unitGroup) {
    super()
    this.action_      = action
    this.unitID_      = null
    this.abilityQ_    = null
    this.abilityW_    = null
    this.abilityE_    = null
    this.abilityR_    = null
    this.attachments_ = new Map

    this.action_.register('stage', this.onStage.bind(this))
    this.action_.register('player', this.onPlayer.bind(this))
    this.action_.register('unitLeave', this.onUnitLeave.bind(this))
    this.action_.register('unitAttach', this.onUnitAttach.bind(this))
    this.action_.register('unitDetach', this.onUnitDetach.bind(this))
  }
  unitID()   { return this.unitID_ }
  abilityQ() { return this.abilityQ_ }
  abilityW() { return this.abilityW_ }
  abilityE() { return this.abilityE_ }
  abilityR() { return this.abilityR_ }
  onStage(payload) {
    this.unitID_   = null
    this.abilityQ_ = null
    this.abilityW_ = null
    this.abilityE_ = null
    this.abilityR_ = null
    this.attachments_.clear()
    this.dispatch('change')
  }
  onPlayer(payload) {
    this.unitID_   = payload.UnitID
    this.abilityQ_ = new PlayerAbilityStore(this.action_, "Q", payload.Q)
    this.abilityW_ = new PlayerAbilityStore(this.action_, "W", payload.W)
    this.abilityE_ = new PlayerAbilityStore(this.action_, "E", payload.E)
    this.abilityR_ = new PlayerAbilityStore(this.action_, "R", payload.R)
    this.attachments_.clear()
    this.dispatch('change')
  }
  onUnitLeave(payload) {
    if (this.unitID_ === null || payload.UnitID !== this.unitID_) {
      return
    }
    this.unitID_   = null
    this.abilityQ_ = null
    this.abilityW_ = null
    this.abilityE_ = null
    this.abilityR_ = null
    this.attachments_.clear()
    this.dispatch('change')
  }
  onUnitAttach(payload) {
    if (this.unitID_ === null || payload.UnitID !== this.unitID_) {
      return
    }
    this.attachments_.set(payload.AttachmentName, payload)
    this.updateAbilities()
  }
  onUnitDetach(payload) {
    if (this.unitID_ === null || payload.UnitID !== this.unitID_) {
      return
    }
    this.attachments_.delete(payload.AttachmentName)
    this.updateAbilities()
  }
  updateAbilities() {
    const disables = []
    for (const disable of this.attachments_.keys()) {
      if (disable === "Stun" || disable === "Silence") {
        disables.push(disable)
      }
    }
    this.abilityQ_.setDisables(disables)
    this.abilityW_.setDisables(disables)
    this.abilityE_.setDisables(disables)
    this.abilityR_.setDisables(disables)
  }
}
