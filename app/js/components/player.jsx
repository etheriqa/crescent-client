import PlayerAbility from './player_ability.jsx'
import PlayerClass from './player_class.jsx'

export default class Player extends React.Component {
  componentDidMount() {
    const id = this.props.player.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.player.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({})
  }
  render() {
    if (this.props.player.unitID() === null) {
      return (
        <div className="player">
          <PlayerClass action={this.props.action} unitClass="Tank" />
          <PlayerClass action={this.props.action} unitClass="Assassin" />
          <PlayerClass action={this.props.action} unitClass="Disabler" />
          <PlayerClass action={this.props.action} unitClass="Mage" />
          <PlayerClass action={this.props.action} unitClass="Healer" />
        </div>
      )
    } else {
      return (
        <div className="player">
          <PlayerAbility ability={this.props.player.abilityQ()} />
          <PlayerAbility ability={this.props.player.abilityW()} />
          <PlayerAbility ability={this.props.player.abilityE()} />
          <PlayerAbility ability={this.props.player.abilityR()} />
        </div>
      )
    }
  }
}
