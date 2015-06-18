import Unit from './unit.jsx'

export default class UnitGroup extends React.Component {
  componentWillMount() {
    const id = this.props.store.register('change', this.onchange.bind(this))
    this.setState({
      id: id,
      units: this.props.store.units()
    })
  }
  componentWillUnmount() {
    this.props.store.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({units: this.props.store.units()})
  }
  render() {
    return (
      <div className="unitGroup">
        {this.state.units.map(unit => <Unit key={unit.unitID()} store={unit} />)}
      </div>
    )
  }
}
