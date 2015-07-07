export default class Chat extends React.Component {
  componentDidMount() {
    React.findDOMNode(this).addEventListener('keypress', e => {
      e.stopPropagation()
    })
  }
  render() {
    return (
      <form className="chat" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder=">>>" />
      </form>
    )
  }
  handleSubmit(e) {
    e.preventDefault()
    const input = React.findDOMNode(this).firstElementChild.value.trim()
    React.findDOMNode(this).firstElementChild.value = ''
    switch (true) {
    // TODO check empty
    case input.startsWith('/profile '):
      this.props.action.profile(input.slice(9).trim())
      break
    case input.startsWith('/chat '):
      this.props.action.chat(input.slice(6).trim())
      break
    case input.startsWith('/level '):
      this.props.action.level(parseInt(input.slice(7).trim()))
      break
    case input.startsWith('/join '):
      this.props.action.join(input.slice(6).trim())
      break
    case input === '/leave':
      this.props.action.leave()
      break
    case input.startsWith('/ability'):
      const args = input.slice(8).trim().split(' ')
      const abilityName = args[0]
      let objectUnitID = null
      if (args.length > 1) {
        objectUnitID = parseInt(args[1])
      }
      this.props.action.ability(abilityName, objectUnitID)
      break
    case input === '/interrupt':
      this.props.action.interrupt()
      break
    case input[0] === '/':
      break
    default:
      if (input === '') {
        return
      }
      this.props.action.chat(input)
    }
  }
}
