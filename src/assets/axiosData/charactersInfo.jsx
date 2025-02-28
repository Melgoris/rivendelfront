import {makeRequest, airtableRequest} from './makeRequest'
import {CharContext} from './context'
import {useContext, useState} from 'react'

export const useCharContext = () => useContext(CharContext)
export const UseCharsContext = ({children}) => {
  const [addInfo, setaddInfo] = useState('')
  const [char, setChar] = useState([])
  const [charCopy, setCharCopy] = useState([])
  const [unsaved, setUnsaved] = useState([])
  const [unsavedTabs, setUnsavedTabs] = useState([])
  const [unsavedTab, setUnsavedTab] = useState([])
  const [dB, setDb] = useState([])
  const [armorData, setArmorData] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true)
  const [openGearModal, setIsOpengearModal] = useState(false)
  const [filteredData, setFilteredData] = useState(false)

  return (
    <CharContext.Provider
      value={{
        char,
        setChar,
        setDb,
        dB,
        unsaved,
        setUnsaved,
        isOpenModal,
        setIsOpenModal,
        filteredData,
        setFilteredData,
        addInfo,
        setaddInfo,
        openGearModal,
        setIsOpengearModal,
        armorData,
        setArmorData,
        unsavedTabs,
        setUnsavedTabs,
        unsavedTab,
        setUnsavedTab,
        isLoadingSkeleton,
        setIsLoadingSkeleton,
        charCopy,
        setCharCopy,
      }}
    >
      {children}
    </CharContext.Provider>
  )
}

export const getCharacters = async (realm, name, ...fields) => {
  try {
    const fieldsStr = fields.length > 0 ? '&fields=' + fields.join('%2C') : ''
    const response = await makeRequest(
      `characters/profile?region=us&realm=${realm}&name=${name}${fieldsStr}`,
      {mode: 'no-cors'},
    )
    return response
  } catch (error) {
    console.error(`Ошибка при получении данных для персонажа ${name}:`, error)
    return null
  }
}

export const getSetAirData = (method = 'GET', roster, data) => {
  const postData = method === 'POST' ? {fields: {...data}} : null
  return airtableRequest(`${roster}`, {
    method,
    data: postData,
    headers: {
      Authorization:
        'Bearer ' +
        'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
    },
  })
}

export const updateAirtable = async (
  roster,
  name,
  newSavedValue,
  tab = 'closed',
) => {
  try {
    const response = await airtableRequest(`${roster}`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' +
          'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
      },
    })
    const record = response.records.find(record => record.fields.name === name)
    // console.log('record', record)
    if (record) {
      // fапдейт если нашло
      await airtableRequest(`${roster}/${record.id}`, {
        method: 'PATCH',
        data: {
          fields: {
            [tab]: newSavedValue,
          },
        },
        headers: {
          Authorization:
            'Bearer ' +
            'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
        },
      })

      // console.log(`Record with name ${name} updated successfully.`)
    } else {
      // console.log(`Record with name ${name} not found.`)
    }
  } catch (error) {
    console.error('Error updating record:', error)
  }
}
