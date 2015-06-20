import UnitActivation from './unit_activation.jsx'
import UnitResource from './unit_resource.jsx'
import UnitResourceLog from './unit_resource_log.jsx'

export default class Unit extends React.Component {
  componentWillMount() {
    this.setState({active: false})
  }
  componentDidMount() {
    const id = this.props.unit.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.unit.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({})
  }
  render() {
    let className = "unit"
    if (this.state.active) {
      className += " unit-active"
    }
    return (
      <div className={className} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
        <UnitActivation unit={this.props.unit} clock={this.props.clock} />
        <UnitResource unit={this.props.unit} resourceType="health" />
        <UnitResource unit={this.props.unit} resourceType="mana" />
        <UnitResourceLog log={this.props.unit.resourceLog()} />
      </div>
    )
  }
  handleMouseEnter(e) {
    this.setState({active: true})
    this.props.action.activateUnit(this.props.unit.unitID())
  }
  handleMouseLeave(e) {
    this.setState({active: false})
    this.props.action.deactivateUnit(this.props.unit.unitID())
  }
}
