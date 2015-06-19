import Dispatcher from './dispatcher'
import LogList from './components/log_list.jsx'
import UnitGroup from './components/unit_group.jsx'
import Clock from './stores/clock'
import {LogStore} from './stores/log'
import UnitGroupStore, {UNIT_GROUP_PLAYER, UNIT_GROUP_AI} from './stores/unit_group'

const action = new Dispatcher
const clock = new Clock(action)
const logStore = new LogStore(action)
const playerUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_PLAYER)
const aiUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_AI)
const ws = new WebSocket(`${window.SERVER_URL}/?name=etheriqa${(new Date()).getMilliseconds()}`)

ws.onopen = function(e) {
  console.log(e)
}
ws.onmessage = function(e) {
  console.log(e)
  const frame = JSON.parse(e.data)
  switch (frame.Type) {
    case 'Sync':
      action.dispatch('sync', frame.Data)
      break
    case 'Message':
      action.dispatch('message', frame.Data)
      break
    case 'Chat':
      action.dispatch('chat', frame.Data)
      break
    case 'UnitJoin':
      action.dispatch('unitJoin', frame.Data)
      break
    case 'UnitLeave':
      action.dispatch('unitLeave', frame.Data)
      break
    case 'UnitResource':
      action.dispatch('unitResource', frame.Data)
      break
    case 'UnitActivating':
      action.dispatch('unitActivating', frame.Data)
      break
    case 'UnitActivated':
      action.dispatch('unitActivated', frame.Data)
      break
  }
}
ws.onclose = function(e) {
  console.log(e)
}
ws.onerror = function(e) {
  console.log(e)
}

window.profile = function(userName) {
  ws.send(JSON.stringify({
    Type: 'Profile',
    Data: {
      UserName: userName
    }
  }))
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
  <div>
    <UnitGroup unitGroup={playerUnitGroupStore} clock={clock} />
    <UnitGroup unitGroup={aiUnitGroupStore} clock={clock} />
    <LogList log={logStore} />
  </div>,
  document.getElementById('crescent')
)
