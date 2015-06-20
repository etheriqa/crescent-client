export default class PlayerClass extends React.Component {
  render() {
    return (
      <div className="player-class" onClick={this.handleClick.bind(this)}>
        {this.props.unitClass}
      </div>
    )
  }
  handleClick() {
    this.props.action.join(this.props.unitClass)
  }
}
