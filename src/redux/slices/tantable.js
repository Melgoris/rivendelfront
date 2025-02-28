import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'

export const getLatestTable = createAsyncThunk(
  'tantable/getLatestTable',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get('/services/table/latest')
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки таблицы')
    }
  },
)
export const getAllTable = createAsyncThunk(
  'tantable/getAllTable',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get('/services/table')
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки таблицы')
    }
  },
)
export const getTableById = createAsyncThunk(
  'tantable/getTableById',
  async ({id}, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`/services/table/${id}`)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки таблицы')
    }
  },
)
export const setNewTable = createAsyncThunk(
  'tantable/setNewTable',
  async ({tableName, period, dayCount}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post('/services/table', {
        tableName,
        period,
        dayCount,
      })
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки таблицы')
    }
  },
)
export const patchTable = createAsyncThunk(
  'tantable/patchTable',
  async ({tableId, playerId, dataColumns}, {rejectWithValue}) => {
    try {
      if (playerId) {
        const {data} = await axios.patch('/services/table/update', {
          tableId,
          playerId,
          dataColumns,
        })
        return {playerId, dataColumns, sum: data.sum}
      } else {
        const {data} = await axios.patch('/services/table/update', {
          tableId,
          dataColumns,
        })
        return {dataColumns, sum: data.sum}
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка обновления таблицы',
      )
    }
  },
)

const initialState = {
  table: {
    names: [],
    data: {
      _id: '',
      players: [],
      footerRow: [],
    },
    status: 'idle',
    error: null,
  },
}

const tantableSlice = createSlice({
  name: 'tantable',
  initialState,
  reducers: {},
  extraReducers: bilder => {
    bilder
      .addCase(getLatestTable.pending, state => {
        state.table.status = 'loading'
      })
      .addCase(getLatestTable.fulfilled, (state, action) => {
        state.table.data = action.payload
        state.table.status = 'loaded'
      })
      .addCase(getLatestTable.rejected, (state, action) => {
        state.table.status = 'error'
        state.table.error = action.error
      })
      .addCase(setNewTable.pending, state => {
        state.table.status = 'loading'
      })
      .addCase(setNewTable.fulfilled, (state, action) => {
        state.table.data = action.payload
        state.table.status = 'loaded'
      })
      .addCase(setNewTable.rejected, (state, action) => {
        state.table.status = 'error'
        state.table.error = action.error
      })
      .addCase(getTableById.pending, state => {
        state.table.status = 'loading'
      })
      .addCase(getTableById.fulfilled, (state, action) => {
        state.table.data = action.payload
        state.table.status = 'loaded'
      })
      .addCase(getTableById.rejected, (state, action) => {
        state.table.status = 'error'
        state.table.error = action.error
      })
      .addCase(patchTable.pending, state => {
        state.table.status = 'updating'
      })
      .addCase(patchTable.fulfilled, (state, action) => {
        const {playerId, dataColumns, sum} = action.payload
        const player = state.table.data.players.find(
          p => p.player._id === playerId,
        )
        if (player) {
          player.dataColumns = dataColumns
          player.sum = sum
        }
        if (!playerId) {
          state.table.data.footerRow.sum = sum
        }
        state.table.status = 'updated'
      })
      .addCase(patchTable.rejected, (state, action) => {
        state.table.status = 'error'
        state.table.error = action.payload
      })
      .addCase(getAllTable.pending, state => {
        state.table.status = 'loading'
      })
      .addCase(getAllTable.fulfilled, (state, action) => {
        state.table.names = action.payload
        state.table.status = 'loaded'
      })
      .addCase(getAllTable.rejected, (state, action) => {
        state.table.status = 'error'
        state.table.error = action.payload
      })
  },
})

export const tantableDataReducer = tantableSlice.reducer
