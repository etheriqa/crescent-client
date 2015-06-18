import Resource from './resource.jsx'

export default class Unit extends React.Component {
  componentWillMount() {
    const id = this.props.unit.register('change', this.onchange.bind(this))
    this.setState({
      id: id,
      unit: this.props.unit
    })
  }
  componentWillUnmount() {
    this.props.unit.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({unit: this.props.unit})
  }
  render() {
    const unit = this.state.unit
    return (
      <div className="unit">
        [{unit.className()}] {unit.unitName()}
        <Resource unit={this.props.unit} resourceType="health" />
        <Resource unit={this.props.unit} resourceType="mana" />
      </div>
    )
  }
}
