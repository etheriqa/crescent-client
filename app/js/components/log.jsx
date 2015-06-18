import {SystemLog, ChatLog} from '../stores/log'

class Log extends React.Component {
  render() {
    switch (true) {
    case this.props.log instanceof SystemLog:
      return (
        <div className="log log-system">
          [{this.props.log.timestamp()}] {this.props.log.message()}
        </div>
      )
    case this.props.log instanceof ChatLog:
      return (
        <div className="log log-chat">
          [{this.props.log.timestamp()}] ({this.props.log.name()}) {this.props.log.message()}
        </div>
      )
    }
  }
}

export class LogList extends React.Component {
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
