import {BrowserRouter} from 'react-router-dom'
import {useEffect, useState} from 'react'
import FooterContainer from './assets/components/footer/Footer'
import HeroImage from './assets/components/heroImage/HeroImage'
import NavbarContainer from './assets/components/navbar/Navbar'
import Services from './assets/components/servise/Servises'
import ModalWindow from './assets/components/modal/Modal'

import {
  getCharacters,
  useCharContext,
  getSetAirData,
} from './assets/axiosData/charactersInfo'
import {charsDb, lowDb, rosterNicks} from './assets/charsDb/chars'
import HeadingCont from './assets/components/servise/headingCont/HeadingCont'
import axios from 'axios'

function App() {
  const {setChar, filteredData, char} = useCharContext()
  useEffect(() => {
    const airDataGet = async roster => {
      const getAir = await Promise.all(
        roster.map(async e => {
          try {
            const airTables = await getSetAirData('GET', e.player)
            return airTables
          } catch (error) {
            console.log(
              `Ошибка при получении данных для персонажа ${e.player}:`,
              error,
            )
            return ''
          }
        }),
      )
      console.log('getAir', getAir)
      const fullAirBase = await Promise.all(
        getAir.map(async e => {
          const records = await Promise.all(
            e.records.map(async f => {
              return f.fields
            }),
          )
          return records
        }),
      )
      setChar(fullAirBase.flat())
      // console.log('fullAirBase', fullAirBase.flat())
    }
    airDataGet(rosterNicks)
  }, [])

  // получение и отображение чариков c райдерио и добавление их в массив для отображения

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const charFullData = await Promise.all(
  //       charsDb.map(async (e, i) => {
  //         try {
  //           const characterData = await getCharacters(e.server, e.name)
  //           return characterData
  //         } catch (error) {
  //           console.log(
  //             `Ошибка при получении данных для персонажа ${e.name}:`,
  //             error,
  //           )
  //           return ''
  //         }
  //       }),
  //     )

  //     const res = charFullData.filter(data => data !== null)
  //     console.log('res', res)
  //     // setChar(res)
  //   }
  //   fetchData()
  // }, [])
  // console.log('res', char)
  //-----------------------------------------------

  //массовое добавление ебланов на аиртейбл,
  //не забудь что e.fields ты деструктурировал и они нахуй не нужны
  //да и в целом ота вся ебала ниже - тесты и нахуй не нада
  //перенеси в отлеьный файл или удали как нить
  useEffect(() => {
    const fetchData = async () => {
      const airBase = await Promise.all(
        lowDb.map(e => {
          return getSetAirData(
            'POST',
            'roster',
            e.fields.Name,
            e.fields.mainPers,
            e.fields.mainPersServer,
          )
        }),
      )
    }
    // fetchData()
  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const airBase = await getSetAirData('', 'stasan')
  //     console.log(airBase)
  //     console.log('filteredData', filteredData)
  //   }

  //   fetchData()
  // }, [filteredData])

  // useEffect(() => {
  //   fetch('https://api.airtable.com/v0/appyEWdPyASTdHUPb/roster ', {
  //     headers: {
  //       Authorization:
  //         'Bearer ' +
  //         'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])
  //---------------------------------------------------------------------
  axios.get('https://api.airtable.com/v0/meta/bases/appyEWdPyASTdHUPb/tables', {
    headers: {
      Authorization:
        'Bearer ' +
        'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
    },
  })
  // .then(e => console.log('BAZA: ', e))

  return (
    <div className='background-container'>
      <div className='overlay'>
        <BrowserRouter>
          <NavbarContainer />
          <ModalWindow />
          {/* <HeroImage /> */}
          <HeadingCont />
          <Services />
        </BrowserRouter>
        <FooterContainer />
      </div>
    </div>
  )
}

export default App
