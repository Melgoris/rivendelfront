import {BrowserRouter, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import FooterContainer from './assets/components/footer/Footer'
import NavbarContainer from './assets/components/navbar/Navbar'
import ModalWindow from './assets/components/modal/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {
  getCharacters,
  useCharContext,
  getSetAirData,
} from './assets/axiosData/charactersInfo'
import {charsDb, rosterNicks, UNCAVED_TABS} from './assets/charsDb/chars'
import GearModal from './assets/gearModal/GearModal'
import {isAuthSelector, fetchLogin} from './redux/slices/auth'
import Profile from './assets/components/profile/Profile'
import ServisRoutes from './assets/components/servise/ServisRoutes'
import {getCalendarEvent} from './redux/slices/calendar'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        dispatch(getCalendarEvent())
      } catch (error) {
        console.error('ошибка:', error)
      }
    }, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])
  // useEffect(() => {
  //   fetchDataFromGoogleT(dispatch)
  // }, [])

  // const datar = useSelector(state => state.auth.data)
  // console.log('testData', testData)
  useEffect(() => {
    // const data = dispatch(fetchLogin())
    dispatch(fetchLogin())

    window.whTooltips = {
      colorLinks: true,
      iconizeLinks: false,
      renameLinks: true,
    }

    const script = document.createElement('script')
    script.src = 'https://wow.zamimg.com/js/tooltips.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  const {
    setChar,
    filteredData,
    char,
    setDb,
    setArmorData,
    unsavedTabs,
    setUnsavedTabs,
    setIsLoadingSkeleton,
    setCharCopy,
  } = useCharContext()

  useEffect(() => {
    setIsLoadingSkeleton(true)
    const airDataGet = async (roster, setDbItems) => {
      const getAir = await Promise.all(
        roster.map(async e => {
          try {
            const airTables = await getSetAirData('GET', e.player)
            // console.log('airTables', airTables)
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
      if (roster === rosterNicks) {
        setDbItems(fullAirBase.flat())
        setCharCopy(fullAirBase.flat())
      } else if (roster === UNCAVED_TABS) {
        setDbItems(fullAirBase)
      }
      setIsLoadingSkeleton(false)
      // setDbItems(fullAirBase.flat())
      // console.log('CharCopy', charCopy)
    }
    // airDataGet(rosterNicks, setChar)
    // airDataGet(UNCAVED_TABS, setUnsavedTabs)
  }, [])

  // получение и отображение чариков c райдерио и добавление их в массив для отображения
  useEffect(() => {
    const fetchData = async () => {
      const charFullData = await Promise.all(
        charsDb.map(async (e, i) => {
          try {
            const characterData = await getCharacters(e.server, e.name, 'gear')
            // пуш данных в аиртейбл
            // const PLAYER_ = e.player
            // try {
            //   await getSetAirData('POST', e.player, {
            //     name: characterData.name,
            //     faction: characterData.faction,
            //     realm: characterData.realm,
            //     region: characterData.region,
            //     class: characterData.class,
            //     gender: characterData.gender,
            //     last_crawled_at: characterData.last_crawled_at,
            //     profile_banner: characterData.profile_banner,
            //     profile_url: characterData.profile_url,
            //     race: characterData.race,
            //     thumbnail_url: characterData.thumbnail_url,
            //     active_spec_name: characterData.active_spec_name,
            //     active_spec_role: characterData.active_spec_role,
            //     closed: false,
            //     saved: false,
            //     visible: false,
            //     pers_id: i,
            //     BD_NAME: PLAYER_,
            //   })
            // } catch (error) {
            //   console.log('ERROR: ', error)
            //   return
            // }
            // console.log('characterData', characterData)
            //===============================================

            return characterData
          } catch (error) {
            console.log(
              `Ошибка при получении данных для персонажа ${e.name}:`,
              error,
            )
            return ''
          }
        }),
      )

      const res = charFullData.filter(data => data !== null)
      // console.log('characterData', res)
      // setChar(res)
      // if (res && res.length > 0) {
      //   setArmorData(res)
      // }
    }
    // fetchData()
  }, [])
  // getSetAirData('PATCH', 'puff', {
  //   if (name:'vasa'){
  //     saved: 'true',
  //   }

  // })
  //-----------------------------------------------

  //массовое добавление ебланов на аиртейбл,
  //не забудь что e.fields ты деструктурировал и они нахуй не нужны
  //да и в целом ота вся ебала ниже - тесты и нахуй не нада
  //перенеси в отлеьный файл или удали как нить
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const airBase = await Promise.all(
  //       lowDb.map(e => {
  //         return getSetAirData(
  //           'POST',
  //           'roster',
  //           e.fields.Name,
  //           e.fields.mainPers,
  //           e.fields.mainPersServer,
  //         )
  //       }),
  //     )
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className='background-container'>
      <div className='overlay'>
        <BrowserRouter>
          <NavbarContainer />
          <ModalWindow />
          <GearModal />
          <ServisRoutes />
          <Profile />
        </BrowserRouter>
        <FooterContainer />
      </div>
    </div>
  )
}

export default App
