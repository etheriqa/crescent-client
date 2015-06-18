import Unit from './unit.jsx'
import {UNIT_GROUP_PLAYER, UNIT_GROUP_AI} from '../stores/unit_group'

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
    let className = "unit-group"
    switch (this.props.store.unitGroup()) {
    case UNIT_GROUP_PLAYER:
      className += " unit-group-player"
      break
    case UNIT_GROUP_AI:
      className += " unit-group-ai"
      break
    }
    return (
      <div className={className}>
        {this.state.units.map(unit => <Unit key={unit.unitID()} store={unit} />)}
      </div>
    )
  }
}
