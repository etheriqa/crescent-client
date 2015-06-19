import Log from './log.jsx'

export default class LogList extends React.Component {
  componentWillMount() {
    const id = this.props.log.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.log.unregister('change', this.state.id)
  }
  componentDidUpdate() {
    const node = React.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  onchange() {
    this.setState({})
  }
  render() {
    return (
      <div className="log-list">
        {this.props.log.logs().map(log => <Log key={log.id()} log={log} />)}
      </div>
    )
  }
}
