export default class UnitActivation extends React.Component {
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
    if (this.props.unit.isActivating()) {
      const elapsed = this.props.clock.now() - this.props.unit.activatingStartTime()
      const progress = elapsed / this.props.unit.activatingDuration()
      return (
        <div className="unit-activating">
          <svg width="200" height="20">
            <rect rx="3" ry="3" width="200" height="6" stroke="white" strokeWidth="1" fill="none" />
            <rect rx="3" ry="3" width={Math.max(0, Math.min(1, progress))*200} height="6" stroke="white" strokeWidth="1" fill="white" />
            <text x="200" y="20" textAnchor="end" fill="white">
              {this.props.unit.activatingAbilityName()}
            </text>
          </svg>
        </div>
      )
    } else {
      return (
        <div className="unit-name">
          [{this.props.unit.className()}] {this.props.unit.unitName()}
        </div>
      )
    }
  }
}
