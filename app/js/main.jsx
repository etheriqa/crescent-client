import Action from './action'
import LogList from './components/log_list.jsx'
import UnitGroup from './components/unit_group.jsx'
import Clock from './stores/clock'
import {LogStore} from './stores/log'
import UnitGroupStore, {UNIT_GROUP_PLAYER, UNIT_GROUP_AI} from './stores/unit_group'

const action = new Action(global.SERVER_URL)
const clock = new Clock(action)
const logStore = new LogStore(action)
const playerUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_PLAYER)
const aiUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_AI)

global.action = action

React.render(
  <div>
    <UnitGroup unitGroup={playerUnitGroupStore} clock={clock} />
    <UnitGroup unitGroup={aiUnitGroupStore} clock={clock} />
    <LogList log={logStore} />
  </div>,
  document.getElementById('crescent')
)
