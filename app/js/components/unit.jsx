import UnitResource from './unit_resource.jsx'

export default class Unit extends React.Component {
  componentWillMount() {
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
    return (
      <div className="unit">
        [{this.props.unit.className()}] {this.props.unit.unitName()}
        <UnitResource unit={this.props.unit} resourceType="health" />
        <UnitResource unit={this.props.unit} resourceType="mana" />
      </div>
    )
  }
}
