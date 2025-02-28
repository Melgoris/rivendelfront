import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async params => {
    const {data} = await axios.post('/login', params)
    return data
  },
)
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async params => {
  const {data} = await axios.get('/about', params)
  return data
})

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async params => {
    try {
      const {data} = await axios.post('/register', params)
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      error.response.data
    }
  },
)

const initialState = {
  data: null,
  status: 'loading',
  isToggle: false,
  registerStatus: 'idle',
  errors: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggle: state => {
      state.isToggle = !state.isToggle
    },
    logout: state => {
      state.data = null
    },
    updateAvatar: (state, action) => {
      if (state.data) state.data.avatar = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(fetchLogin.pending, state => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(fetchRegister.pending, state => {
        state.registerStatus = 'loading'
        state.data = null
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.registerStatus = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.registerStatus = 'failed'
        state.errors = action.error.message
      })
  },
})
export const {toggle, logout, updateAvatar} = authSlice.actions
export const isAuthSelector = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
