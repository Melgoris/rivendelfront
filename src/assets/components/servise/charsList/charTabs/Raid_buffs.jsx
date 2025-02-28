import React from 'react'
import RAID_BUFFS from '../../../../gearModal/raidBuffs/raidBuffs'

const Raid_buffs = ({tabs}) => {
  return (
    <>
      {RAID_BUFFS.map((buffs, i) => (
        <img
          key={i}
          src={buffs.buff}
          style={
            tabs.find(tab => tab.class === buffs.class) ? {} : buffs.noExists
          }
          title={buffs.title}
        />
      ))}
    </>
  )
}

export default Raid_buffs
