import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'

export const getCalendarEvent = createAsyncThunk(
  'calendar/getCalendarEvent',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get('/calendar/events/get')
      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при получении событий',
      )
    }
  },
)

export const addCalendarEvent = createAsyncThunk(
  'calendar/addCalendarEvent',
  async (eventData, {dispatch, rejectWithValue}) => {
    try {
      const response = await Promise.all(
        eventData.map(event => axios.post('/calendar/events/add', event)),
      )
      await dispatch(getCalendarEvent())
      return response.map(res => res.data)
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при добавлении события',
      )
    }
  },
)

export const addCalendarParceEvents = createAsyncThunk(
  'calendar/addCalendarEvent',
  async (eventData, {dispatch, rejectWithValue}) => {
    try {
      const response = await Promise.all(
        eventData.map(event => {
          event.map(async day => {
            await axios.post('/calendar/events/add', day)
          })
        }),
      )
      await dispatch(getCalendarEvent())
      return response.map(res => res.data)
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при добавлении события',
      )
    }
  },
)

export const deleteCalendarEvent = createAsyncThunk(
  'calendar/deleteCalendarEvent',
  async ({id, eventType}, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(`/calendar/events/`, {params: {id}})
      return {data, id, eventType}
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при удалении события',
      )
    }
  },
)

export const syncCalendarEvents = createAsyncThunk(
  '/calendar/syncCalendarEvents',
  async (eventsData, {rejectWithValue}) => {
    try {
      const {data} = await axios.post('/api/sync-events', {events: eventsData})
      const {events, updated, created, deleted} = data
      return {events, updated, created, deleted}
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const initialState = {
  calendar: {
    events: [],
    backgroundEvents: [],
    status: 'idle',
    error: null,
  },
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCalendarEvent.pending, state => {
        state.calendar.status = 'loading'
      })
      .addCase(getCalendarEvent.fulfilled, (state, action) => {
        state.calendar.events = action.payload.filter(
          event => event.eventType !== 'background',
        )
        state.calendar.backgroundEvents = action.payload.filter(
          event => event.eventType === 'background',
        )
        state.calendar.status = 'loaded'
      })
      .addCase(getCalendarEvent.rejected, (state, action) => {
        state.calendar.status = 'error'
        state.calendar.error = action.payload || 'Ошибка при получении событий'
      })

      .addCase(addCalendarEvent.pending, state => {
        state.calendar.status = 'loading'
      })
      .addCase(addCalendarEvent.fulfilled, (state, action) => {
        const normalEvents = action.payload.filter(
          event => event.eventType !== 'background',
        )
        const backgroundEvents = action.payload.filter(
          event => event.eventType === 'background',
        )
        state.calendar.events = [...state.calendar.events, ...normalEvents]
        state.calendar.backgroundEvents = [
          ...state.calendar.backgroundEvents,
          ...backgroundEvents,
        ]
        state.calendar.status = 'loaded'
      })
      .addCase(addCalendarEvent.rejected, (state, action) => {
        state.calendar.status = 'error'
        state.calendar.error = action.payload || 'Ошибка при добавлении события'
      })

      .addCase(deleteCalendarEvent.pending, state => {
        state.calendar.status = 'loading'
      })
      .addCase(deleteCalendarEvent.fulfilled, (state, action) => {
        if (action.payload.eventType === 'background') {
          state.calendar.backgroundEvents =
            state.calendar.backgroundEvents.filter(
              event => event._id !== action.payload.id,
            )
        } else {
          state.calendar.events = state.calendar.events.filter(
            event => event._id !== action.payload.id,
          )
        }
        state.calendar.status = 'loaded'
      })
      .addCase(deleteCalendarEvent.rejected, (state, action) => {
        state.calendar.status = 'error'
        state.calendar.error = action.payload || 'Ошибка при удалении события'
      })
      .addCase(syncCalendarEvents.pending, state => {
        state.calendar.status = 'loading'
      })
      .addCase(syncCalendarEvents.fulfilled, (state, action) => {
        state.calendar.events = action.payload.events.filter(
          event => event.eventType !== 'background',
        )
        state.calendar.backgroundEvents = action.payload.events.filter(
          event => event.eventType === 'background',
        )
        state.calendar.status = 'loaded'
      })
      .addCase(syncCalendarEvents.rejected, (state, action) => {
        state.calendar.status = 'error'
        state.calendar.error =
          action.payload || 'Ошибка при синхронизации событий'
      })
  },
})

export const calendarReducer = calendarSlice.reducer
