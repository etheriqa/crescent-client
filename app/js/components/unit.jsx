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
        name: [{unit.unitID()}] {unit.unitName()} ({unit.className()})<br />
        health: {unit.health()} / {unit.healthMax()}<br />
        mana: {unit.mana()} / {unit.manaMax()}<br />
      </div>
    )
  }
}
