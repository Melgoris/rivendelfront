const STATUS_ON_DECK = {id: 111, name: 'On Deck', color: 'blue.300'}
const STATUS_ON_READY = {id: 511, name: 'On Ready', color: 'green.300'}
const STATUS_IN_PROGRESS = {
  id: 211,
  name: 'In Progress',
  color: 'yellow.400',
}
const STATUS_SLEEPING = {id: 311, name: 'Sleep', color: 'pink.300'}
const STATUS_DND = {id: 411, name: 'DND', color: 'red.400'}
export const STATUSES = [
  {id: 111, name: 'On Deck', color: 'blue.300'},
  {id: 511, name: 'On Ready', color: 'green.300'},
  {
    id: 211,
    name: 'In Progress',
    color: 'yellow.400',
  },
  {id: 311, name: 'Sleep', color: 'pink.300'},
  {id: 411, name: 'DND', color: 'red.400'},
]
const DPS = {id: 6, name: 'DPS', color: 'red.400'}
const TANK = {id: 7, name: 'TANK', color: 'green.300'}
const HEAL = {id: 8, name: 'HEAL', color: 'yellow.400'}
// export const STATUSES = [
//   STATUS_ON_READY,
//   STATUS_ON_DECK,
//   STATUS_IN_PROGRESS,
//   STATUS_SLEEPING,
//   STATUS_DND,
// ]
export const ROLE = [DPS, TANK, HEAL]

const DATA = [
  {
    player: 'puff',
    statuse: {id: 111, name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
    role: 'DPS',
  },
  {
    player: 'stasan',
    statuse: {id: 111, name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
    role: 'DPS',
  },
]
export const DATA_ = [
  {
    player: 'puff',
    role: 'dps',
    status: {name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
  },
  {
    player: 'stasan',
    role: 'dps',
    status: {name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
  },
  {
    player: 'pincdragon',
    role: 'dps',
    status: {name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
  },
  {
    player: 'shiro',
    role: 'dps',
    status: {name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
  },
  {
    player: 'melgoris',
    role: 'dps',
    status: {name: 'On Deck', color: 'blue.300'},
    keys: 0,
    kef: 0,
  },
]
export default DATA
