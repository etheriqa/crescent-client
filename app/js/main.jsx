import Dispatcher from './dispatcher'
import LogList from './components/log_list.jsx'
import {LogStore} from './stores/log'

const ws = new WebSocket(`${window.SERVER_URL}/?name=etheriqa${(new Date()).getMilliseconds()}`)
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

window.stage = function(stageID) {
  ws.send(JSON.stringify({
    Type: 'Stage',
    Data: {
      StageID: stageID
    }
  }))
}

window.join = function(className) {
  ws.send(JSON.stringify({
    Type: 'Join',
    Data: {
      ClassName: className
    }
  }))
}

window.leave = function() {
  ws.send(JSON.stringify({
    Type: 'Leave',
    Data: {}
  }))
}

window.ability = function(abilityName, objectUnitID) {
  ws.send(JSON.stringify({
    Type: 'Ability',
    Data: {
      AbilityName: abilityName,
      ObjectUnitID: objectUnitID
    }
  }))
}

window.interrupt = function() {
  ws.send(JSON.stringify({
    Type: 'Interrupt',
    Data: {}
  }))
}

React.render(
  <LogList store={logStore} />,
  document.getElementById('crescent')
)
