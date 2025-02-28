import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../assets/axiosData/mongoDb'
import {getCharacters} from '../../assets/axiosData/charactersInfo'

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const {data} = await axios.get('/cards')
  return data
})

export const updateCards = createAsyncThunk(
  'cards/updateCards',
  async ({server, name, id, userId}, {rejectWithValue}) => {
    try {
      const getParseData = await getCharacters(server, name, 'gear')
      const {data} = await axios.patch(`/cards/${id}`, getParseData)
      return {data, id}
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка')
    }
  },
)
export const charRangUpdate = createAsyncThunk(
  'cards/charRangUpdate',
  async ({id, ...dataUpdate}, {rejectWithValue}) => {
    try {
      const {data} = await axios.patch(`/cards/${id}`, dataUpdate)
      return {id: data, dataUpdate}
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка')
    }
  },
)
export const deleteCards = createAsyncThunk(
  'cards/deleteCards',
  async ({id, userId}, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(`/cards/${id}`, {params: userId})
      return {data, id}
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка')
    }
  },
)

export const addCards = createAsyncThunk(
  'cards/addCards',
  async ({server, name, userId}, {rejectWithValue}) => {
    try {
      const {data, status} = await axios.get('/cards', {
        params: {server, name, userId},
      })
      if (data.length > 0)
        return rejectWithValue('такой персонаж уже есть в базе')

      let getParseData
      try {
        getParseData = await getCharacters(server, name, 'gear')
      } catch (parseError) {
        return rejectWithValue(
          parseError.message || 'Ошибка при парсинге персонажа',
        )
      }
      if (!getParseData) {
        return rejectWithValue('Не удалось получить данные о персонаже')
      }

      const result = await axios.post('/cards/add', getParseData)

      return {
        _id: result.data._id,
        player: {_id: result.data.player},
        ...getParseData,
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Произошла ошибка',
      )
    }
  },
)

const initialState = {
  cards: {
    items: [],
    originalItems: [],
    status: 'idle',
    error: null,
    addStatus: 'idle',
    updateStatus: 'idle',
  },
  saved: {
    cd: false,
    status: 'idle',
  },
}

const cardSlise = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    filterCards: (state, action) => {
      state.cards.items = state.cards.items.filter(
        card => card.class === action.payload,
      )
    },
    filterRangs: (state, action) => {
      state.cards.items = state.cards.items.filter(
        card => card.rang === action.payload,
      )
    },
    resetFilter: state => {
      state.cards.items = state.cards.originalItems
    },
  },
  extraReducers: builder => {
    const setLoading = state => {
      state.cards.status = 'loading'
    }
    const setAddLoading = state => {
      state.cards.addStatus = 'loading'
    }
    const updateRangStatus = state => {
      state.cards.updateStatus = 'loading'
    }
    const setError = (state, action) => {
      state.cards.status = 'error'
      state.cards.error = action.error?.message || 'неизвесная ошибка'
    }
    builder
      .addCase(addCards.pending, setAddLoading)
      .addCase(addCards.fulfilled, (state, action) => {
        state.cards.items.push(action.payload)
        state.cards.addStatus = 'loaded'
      })
      .addCase(addCards.rejected, (state, action) => {
        state.cards.addStatus = 'error'
        state.cards.error = action.payload || 'неизвесная ошибка'
      })
      .addCase(fetchCards.pending, setLoading)
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards.items = action.payload
        state.cards.originalItems = action.payload
        state.cards.status = 'loaded'
      })
      .addCase(fetchCards.rejected, setError)
      .addCase(updateCards.pending, setLoading)
      .addCase(updateCards.fulfilled, (state, action) => {
        state.cards.items = state.cards.items.map(card => {
          const getData = action.payload.data
          return card._id === getData.id ? {...card, ...getData} : card
        })
        state.cards.status = 'loaded'
      })
      .addCase(updateCards.rejected, setError)
      .addCase(charRangUpdate.pending, updateRangStatus)
      .addCase(charRangUpdate.fulfilled, (state, action) => {
        const {id, dataUpdate} = action.payload
        state.cards.items = state.cards.items.map(card => {
          return card._id === id ? {...card, ...dataUpdate} : card
        })
        state.cards.updateStatus = 'loaded'
      })
      .addCase(charRangUpdate.rejected, setError)
      .addCase(deleteCards.pending, setLoading)
      .addCase(deleteCards.fulfilled, (state, action) => {
        state.cards.items = state.cards.items.filter(
          card => card._id !== action.payload.id,
        )
        state.cards.status = 'loaded'
      })
      .addCase(deleteCards.rejected, setError)
  },
})

export const {filterCards, resetFilter, filterRangs} = cardSlise.actions
export const cardReduser = cardSlise.reducer
