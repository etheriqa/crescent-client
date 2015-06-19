import Unit from './unit.jsx'
import {UNIT_GROUP_PLAYER, UNIT_GROUP_AI} from '../stores/unit_group'

export default class UnitGroup extends React.Component {
  componentWillMount() {
    const id = this.props.unitGroup.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.unitGroup.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({})
  }
  render() {
    let className = "unit-group"
    switch (this.props.unitGroup.unitGroup()) {
    case UNIT_GROUP_PLAYER:
      className += " unit-group-player"
      break
    case UNIT_GROUP_AI:
      className += " unit-group-ai"
      break
    }
    return (
      <div className={className}>
        {this.props.unitGroup.units().map(unit => <Unit key={unit.unitID()} unit={unit} />)}
      </div>
    )
  }
}
