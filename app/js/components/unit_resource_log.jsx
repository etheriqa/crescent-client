export default class UnitResourceLog extends React.Component {
  componentWillMount() {
    this.setState({logs: []})
  }
  componentDidMount() {
    const id = this.props.log.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.log.unregister('change', this.state.id)
  }
  onchange() {
    const logs = []
    for (const log of this.props.log.logs()) {
      logs.push(log)
    }
    this.setState({logs: logs})
  }
  render() {
    return (
      <div className="unit-resource-log">
        <React.addons.CSSTransitionGroup transitionName="unit-resource-log" transitionLeave={false}>
          {this.state.logs.map((log) => (
            <div key={log.id} className={log.type + (log.isCritical ? ' critical' : '')}>
              {log.amount}
            </div>
          ))}
        </React.addons.CSSTransitionGroup>
      </div>
    )
  }
}
