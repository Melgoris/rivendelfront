import React, {useState} from 'react'
import style from './profileChars.module.css'
import {role, classIco, smallCardBg, classColors} from '../../icons/Icons.js'
import background from './backgrounds/priest.png'

import {GrUpdate} from 'react-icons/gr'
import MenuList from './menuList/MenuList.jsx'
import LoadData from './loading/LoadData.jsx'
import {BUTTONS_} from './menuList/dataButton.js'
import {useDispatch} from 'react-redux'
import {deleteCards, updateCards} from '../../../../../../redux/slices/cards.js'
import CheckboxList from './checkboxList/CheckboxList.jsx'
import {PROFILE_ICONS} from '../../../../profile/classIcons.js'

const ProfileCard = ({char}) => {
  const rangs = ['Мейн', 'Твинк-1', 'Твинк-2', 'Твинк-3']
  const cdOrNot = ['чистый', 'грязный']
  const dispatch = useDispatch()
  const {
    _id: charID,
    player: {_id: playerId},
    active_spec_role: getRole,
    realm: server,
    name: name,
    rang,
    saved,
  } = char
  // console.log('char', char)
  const [icoAnimation, setIcoAnimation] = useState(false)
  const banner = char.profile_banner
    ? `//cdn.raiderio.net/images/profile/masthead_backdrops/v2/${char.profile_banner}.jpg`
    : ''

  const deleteChar = async () => {
    try {
      if (charID) await dispatch(deleteCards({id: charID, playerId}))
    } catch (error) {
      console.log('ошибка: ', error)
    }
  }
  const updateChar = async () => {
    try {
      if (playerId && server && name) {
        await dispatch(updateCards({server, name, id: charID, playerId}))
      }
    } catch (error) {
      console.log('ошибка: ', error)
    }
  }

  return (
    <>
      <div className={style.list_}>
        <CheckboxList
          fieldName='saved'
          parcedStatus={saved === true ? 'чистый' : 'грязный'}
          charID={charID}
          items={cdOrNot}
          placeholder={'чистый'}
          server={server}
          name={name}
        />
        <CheckboxList
          fieldName='rang'
          parcedStatus={rang}
          charID={charID}
          items={rangs}
          placeholder={'ранг чара'}
          server={server}
          name={name}
        />
      </div>

      <div key={'banner' + char.name} className={style.container}>
        <div
          className={style.story}
          style={
            PROFILE_ICONS[char?.class]
              ? {
                  backgroundImage: `url(${PROFILE_ICONS[char.class]})`,
                  backgroundSize: 'cover',
                }
              : {
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                }
          }
        >
          {' '}
          <div className={style.mini_card}>
            {/* <img className={style.bgraund} src={smallCardBg} /> */}
            <div className={style.class_ico}>
              {/* <GrUpdate className={style.update_ico} /> */}
              {/* <img
              src={
                classIco[char.class] ? classIco[char.class] : classIco.notFound
              }
            /> */}
            </div>
            <div
              // style={{color: `${classColors[char.class]}`}}
              className={`${style.char_name} `}
            >
              {char.name}
              <span className={style.ilvl}>
                {Math.trunc(char?.gear?.item_level_equipped) || ''}
              </span>
            </div>
            <div className={style.spec_name}>
              <span>{char.active_spec_name}</span>
            </div>

            <div className={style.image_mini}>
              <img
                src={role[getRole] ? role[getRole] : role.DPS}
                alt={getRole}
              />
            </div>

            <div
              style={{color: `${classColors[char.class]}`}}
              className={style.char_occupation}
            >
              {char.class}
            </div>
          </div>
        </div>

        <div className={style.buttons1}>
          {BUTTONS_.map((e, i) => (
            <div
              onClick={e.text === 'Update' ? updateChar : deleteChar}
              onMouseEnter={() => setIcoAnimation(i)}
              onMouseLeave={() => setIcoAnimation(null)}
              key={'buttons' + i}
              className={style.menu_list}
            >
              <MenuList
                text={e.text}
                loadData={<e.loadData />}
                update={
                  <e.update
                    className={`${style.update_ico} ${
                      icoAnimation === i ? style.update_ico_hover : ''
                    }`}
                  />
                }
                index={i}
                isUpdating={icoAnimation === i}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfileCard
