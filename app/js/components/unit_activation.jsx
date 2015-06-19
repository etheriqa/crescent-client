export default class UnitActivation extends React.Component {
  render() {
    if (this.props.unit.isActivating()) {
      return (
        <div className="unit-activating">
          <svg width="200" height="20">
            <rect rx="3" ry="3" width="200" height="6" stroke="white" strokeWidth="1" fill="none" />
            <rect rx="3" ry="3" width="100" height="6" stroke="white" strokeWidth="1" fill="white" />
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
