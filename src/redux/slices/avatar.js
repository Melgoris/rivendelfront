import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'
import {updateAvatar} from './auth'

export const fetchAvatarData = createAsyncThunk(
  'loadAvatar/fetchAvatarData',
  async (params, thunkAPI) => {
    try {
      const {data} = await axios.patch('/user/avatar', params)
      if (data) {
        const {avatar} = data.user
        thunkAPI.dispatch(updateAvatar(avatar))
      }
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Ошибка загрузки аватара',
      )
    }
  },
)

const initialState = {
  data: null,
  status: 'loading',
  errors: null,
}

const avatarSlise = createSlice({
  name: 'loadAvatar',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAvatarData.pending, state => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAvatarData.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchAvatarData.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
  },
})

export const avatarReducer = avatarSlise.reducer
