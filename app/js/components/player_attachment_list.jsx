export default class PlayerAttachmentList extends React.Component {
  componentWillMount() {
    this.setState({attachments: []})
  }
  componentDidMount() {
    const id = this.props.player.register('change', this.onchange.bind(this))
    this.setState({id: id})
  }
  componentWillUnmount() {
    this.props.player.unregister('change', this.state.id)
  }
  onchange() {
    const attachments = []
    for (const attachment of this.props.player.attachments()) {
      attachments.push(attachment)
    }
    this.setState({attachments: attachments})
  }
  render() {
    return (
      <div className="player-attachment-list">
        {this.state.attachments.map(attachment => 
          attachment.AttachmentName + (attachment.Stack === 0 ? '' : ` (${attachment.Stack})`)
        ).join(' / ')}
      </div>
    )
  }
}
