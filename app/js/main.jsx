import Action from './action'
import Chat from './components/chat.jsx'
import LogList from './components/log_list.jsx'
import Player from './components/player.jsx'
import UnitGroup from './components/unit_group.jsx'
import Clock from './stores/clock'
import PlayerStore from './stores/player'
import LogStore from './stores/log'
import UnitGroupStore, {UNIT_GROUP_PLAYER, UNIT_GROUP_AI} from './stores/unit_group'

const action = new Action(global.SERVER_URL)
const clock = new Clock(action)
const logStore = new LogStore(action)
const playerUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_PLAYER)
const aiUnitGroupStore = new UnitGroupStore(action, UNIT_GROUP_AI)
const playerStore = new PlayerStore(action, playerUnitGroupStore)

React.render(
  <div>
    <UnitGroup unitGroup={playerUnitGroupStore} clock={clock} />
    <UnitGroup unitGroup={aiUnitGroupStore} clock={clock} />
    <Player action={action} player={playerStore} />
    <LogList log={logStore} />
    <Chat action={action} />
  </div>,
  document.getElementById('crescent')
)
