export default class Chat extends React.Component {
  render() {
    return (
      <form className="chat" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder=">>>" onSubmit={e=>console.log(e)} />
      </form>
    )
  }
  handleSubmit(e) {
    e.preventDefault()
    const message = React.findDOMNode(this).firstElementChild.value
    this.props.action.chat(message)
    React.findDOMNode(this).firstElementChild.value = ''
  }
}
