export default class Unit extends React.Component {
  componentWillMount() {
    const id = this.props.store.register('change', this.onchange.bind(this))
    this.setState({
      id: id,
      unit: this.props.store
    })
  }
  componentWillUnmount() {
    this.props.store.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({unit: this.props.store})
  }
  render() {
    const unit = this.state.unit
    return (
      <div className="unit">
        name: {unit.unitName()} ({unit.className()})<br />
        health: {unit.health()} / {unit.healthMax()}<br />
        mana: {unit.mana()} / {unit.manaMax()}<br />
      </div>
    )
  }
}
