import {createContext} from 'react'

export const CharContext = createContext({
  getCharacters: () => {},
  getAirtableCharacters: () => {},
  getAirtableData: () => {},
  setAirtableData: () => {},
})
