import Dispatcher from './dispatcher'
import {LogList} from './components/log.jsx'
import {LogStore} from './stores/log'

const ws = new WebSocket(`ws://localhost:25200/?name=etheriqa${(new Date()).getMilliseconds()}`)
const action = new Dispatcher
const logStore = new LogStore(action)

ws.onopen = function(e) {
  console.log(e)
}
ws.onmessage = function(e) {
  console.log(e)
  const frame = JSON.parse(e.data)
  switch (frame.Type) {
    case 'Message':
      action.dispatch('message', frame.Data)
      break
    case 'Chat':
      action.dispatch('chat', frame.Data)
  }
}
ws.onclose = function(e) {
  console.log(e)
}
ws.onerror = function(e) {
  console.log(e)
}

window.chat = function(message) {
  ws.send(JSON.stringify({
    Type: 'Chat',
    Data: {
      Message: message
    }
  }))
}

React.render(
  <LogList store={logStore} />,
  document.getElementById('crescent')
)
