import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'

export const getAllPlayers = createAsyncThunk(
  'players/getAllPlayers',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get('/players')

      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки игроков')
    }
  },
)

const initialState = {
  data: [],
  status: 'idle',
  errors: null,
}

const getPlayersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: bilder => {
    bilder
      .addCase(getAllPlayers.pending, state => {
        state.status = 'loading'
      })
      .addCase(getAllPlayers.fulfilled, (state, actions) => {
        state.data = actions.payload
        state.status = 'loaded'
      })
      .addCase(getAllPlayers.rejected, (state, actions) => {
        state.errors = actions.error
        state.status = 'error'
      })
  },
})

export const playersDataReducer = getPlayersSlice.reducer
