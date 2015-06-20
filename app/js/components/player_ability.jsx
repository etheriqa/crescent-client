import {GAME_TICK} from '../stores/clock'

export default class PlayerAbility extends React.Component {
  componentDidMount() {
    const id = this.props.clock.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.clock.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({})
  }
  render() {
    if (this.props.ability.isCooldown()) {
      return (
        <div className="player-ability player-ability-cooldown">
          {Math.max(0, Math.ceil((this.props.ability.cooldownEndTime() - this.props.clock.now()) * GAME_TICK / 1000))}
        </div>
      )
    } else {
      return (
        <div className="player-ability player-ability-ready">
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
}
