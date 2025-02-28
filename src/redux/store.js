import {configureStore} from '@reduxjs/toolkit'
import {cardReduser} from './slices/cards'
import {authReducer} from './slices/auth'
import {avatarReducer} from './slices/avatar.js'
import {calendarReducer} from './slices/calendar.js'
import {playersDataReducer} from './slices/players.js'
import {tantableDataReducer} from './slices/tantable.js'
import {columnReducer} from './slices/columns.js'

const store = configureStore({
  reducer: {
    cards: cardReduser,
    auth: authReducer,
    loadAvatar: avatarReducer,
    calendar: calendarReducer,
    players: playersDataReducer,
    tantable: tantableDataReducer,
    columns: columnReducer,
  },
})

export default store
