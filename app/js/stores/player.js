import Dispatcher from '../dispatcher'
import PlayerAbilityStore from './player_ability'

export default class PlayerStore extends Dispatcher {
  constructor(action, unitGroup) {
    super()
    this.action_   = action
    this.unitID_   = null
    this.abilityQ_ = null
    this.abilityW_ = null
    this.abilityE_ = null
    this.abilityR_ = null

    this.action_.register('player', this.onPlayer.bind(this))
    this.action_.register('unitLeave', this.onUnitLeave.bind(this))
  }
  unitID()   { return this.unitID_ }
  abilityQ() { return this.abilityQ_ }
  abilityW() { return this.abilityW_ }
  abilityE() { return this.abilityE_ }
  abilityR() { return this.abilityR_ }
  onPlayer(payload) {
    this.unitID_   = payload.UnitID
    this.abilityQ_ = new PlayerAbilityStore(this.action_, "Q", payload.Q)
    this.abilityW_ = new PlayerAbilityStore(this.action_, "W", payload.W)
    this.abilityE_ = new PlayerAbilityStore(this.action_, "E", payload.E)
    this.abilityR_ = new PlayerAbilityStore(this.action_, "R", payload.R)
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
    this.dispatch('change')
  }
}
