import {SystemLog, ChatLog} from '../stores/log'

export default class Log extends React.Component {
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
