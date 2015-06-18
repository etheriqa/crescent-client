import Log from './log.jsx'

export default class LogList extends React.Component {
  componentWillMount() {
    const id = this.props.store.register('change', this.onchange.bind(this))
    this.setState({
      id: id,
      logs: this.props.store.logs()
    })
  }
  componentWillUnmount() {
    this.props.store.unregister('change', this.state.id)
  }
  onchange() {
    this.setState({logs: this.props.store.logs()})
  }
  render() {
    return (
      <div className="logList">
        {this.state.logs.map(log => <Log key={log.id()} log={log} />)}
      </div>
    )
  }
}
