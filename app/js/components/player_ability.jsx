import {GAME_TICK} from '../stores/clock'

export default class PlayerAbility extends React.Component {
  render() {
    return (
      <div className="player-ability">
        <div className="player-ability-title">
          {this.props.ability.key()}: {this.props.ability.name()}
        </div>
        <div className="player-ability-stats">
          Cost: {this.props.ability.manaCost()} /
          Charge: {this.props.ability.activationDuration() * GAME_TICK / 1000}s /
          CD: {this.props.ability.cooldownDuration() * GAME_TICK / 1000}s
        </div>
        <div className="player-ability-description">
          {this.props.ability.description()}
        </div>
      </div>
    )
  }
}
