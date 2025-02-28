import style from './style.module.css'
import {miniArmorIco} from '../../../../../miniArmor/miniArmor'
import EnchGemsMini from './EnchGemsMini'

const CharCards = ({char}) => {
  // console.log('char', char)
  return (
    <>
      <p className={style.player_name}>{char?.player?.player}</p>
      <div className={style.char_card_avatar}>
        <img src={char.thumbnail_url} alt='' />
      </div>

      <div className={style.char_card_details}>
        <div className={style.char_name}>{char.name}</div>
        <div className={style.char_occupation}>{char.class}</div>
        <div className={style.char_card_about}>
          <div className={style.char_item}>
            <span className={style.value}>{char.realm}</span>
            <span className={style.label}>{char.region.toUpperCase()}</span>
          </div>
          <div className={style.char_item}>
            <span className={style.value}>{char.active_spec_name}</span>
            <span className={style.label}>{char.active_spec_role}</span>
          </div>
          <div className={style.char_item}>
            <span className={style.value}>ilvl</span>
            <span className={style.label}>
              {Math.round(char?.gear ? char?.gear?.item_level_equipped : 0)}
            </span>
          </div>
        </div>
        {/* <div className='char-skills'>
          <span className='value'>
            Последнее обновление персонажа:{}
            <p>{formatDate}</p>
          </span>
        </div> */}
      </div>
      <div className={style.char_card_mini_icons}>
        <EnchGemsMini items={char?.gear?.items} />
      </div>
    </>
  )
}

export default CharCards
