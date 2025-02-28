import React, {useState} from 'react'
import miniCard from './miniCard.module.css'
import {role, classIco, smallCardBg, classColors} from '../icons/Icons.js'

const MiniCard = ({char}) => {
  console.log('char', char)
  const getRole = char.active_spec_role
  return (
    <div className={miniCard.mini_card}>
      <img className={miniCard.bgraund} src={smallCardBg} />
      <div className={miniCard.class_ico}>
        <img
          src={classIco[char.class] ? classIco[char.class] : classIco.notFound}
        />
      </div>
      <div className={miniCard.image_mini}>
        <img src={role[getRole] ? role[getRole] : role.DPS} alt={getRole} />
      </div>
      <div
        style={{color: `${classColors[char.class]}`}}
        className={`${miniCard.char_name} `}
      >
        {char.name}
        <p className={`${miniCard.p_name} ${miniCard.player_gear}`}>
          {char?.player?.player}
        </p>
        <p className={`${miniCard.p_gear} ${miniCard.player_gear}`}>
          {char?.gear?.item_level_equipped} ilvl
        </p>
        {/* <span className={miniCard.ilvl}>ilvl:444</span> */}
      </div>
      {/* <div className='char-occupation'>{char.class}</div> */}
    </div>
  )
}

export default MiniCard
