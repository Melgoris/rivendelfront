import React, {useEffect, useRef, useState} from 'react'
import {CharContext} from '../axiosData/context'
import {useCharContext} from '../axiosData/charactersInfo'
import emptyIco from './empty.png'
import {GEMS_DATA_, ENCHANTS_DATA} from '../../gemsEnchants/enchantsHelper'

const ItemBlock = ({gearModStyle, mainDiv, helm, position, armors, setArr}) => {
  const {armorData} = useCharContext()

  const arrmorLink = armorData?.gear?.items[`${armors}`]?.['item_id']
  const ilvl = armorData?.gear?.items[`${armors}`]?.['item_level']
  const item_quality = armorData?.gear?.items[`${armors}`]?.['item_quality']
  const gems = armorData?.gear?.items[`${armors}`]?.['gems'].join(':')
  const gemsMass = armorData?.gear?.items[`${armors}`]?.['gems']
  const bonuses = armorData?.gear?.items[`${armors}`]?.['bonuses'].join(':')
  const enchant = armorData?.gear?.items[`${armors}`]?.['enchant']
  const dataWowhead =
    `item=${arrmorLink}` +
    (gems ? `&gems=${gems}` : '') +
    (setArr ? `&pcs=${setArr}` : '') +
    (enchant ? `&ench=${enchant}` : '') +
    (bonuses ? `&bonus=${bonuses}` : '') +
    (ilvl ? `&ilvl=${ilvl}` : '')

  const armorLinckImg = armorData?.gear?.items[`${armors}`]?.['icon']
    ? `https://cdn.raiderio.net/images/wow/icons/large/${
        armorData?.gear?.items[`${armors}`]?.['icon']
      }.jpg`
    : false

  return (
    <div className={mainDiv}>
      {position === 'left' ? (
        <a href='#' data-wowhead={dataWowhead}>
          <img
            className={gearModStyle.gearImg}
            src={armorLinckImg || emptyIco}
            alt='Image'
          />
        </a>
      ) : (
        ''
      )}
      {gemsMass?.length > 0 && (
        <div
          className={`${
            position === 'left'
              ? gearModStyle.gemContReverse
              : gearModStyle.gemContainer
          }`}
        >
          {gemsMass?.map((gem, i) => (
            <div
              className={`${gearModStyle.gems} ${
                position === 'left'
                  ? gearModStyle.gemsRight
                  : gearModStyle.gemsLeft
              }`}
              key={GEMS_DATA_[gem]?.id + i}
              title={GEMS_DATA_[gem]?.stats}
            >
              <img
                className={gearModStyle.gemImg}
                src={`https://wow.zamimg.com/images/wow/icons/small/${
                  GEMS_DATA_[gem]?.ico || 'inv_misc_gem_variety_01'
                }.jpg`}
                alt=''
              />
              <img
                className={gearModStyle.craftingQuality}
                src={GEMS_DATA_[gem]?.quality}
                alt=''
              />
            </div>
          ))}
        </div>
      )}
      <div className={gearModStyle.text}>
        {ENCHANTS_DATA[enchant] && (
          <div
            className={`${gearModStyle.enchantContainer} ${
              position === 'left'
                ? gearModStyle.ench_left
                : gearModStyle.ench_right
            }`}
          >
            {position === 'right' && (
              <p className={gearModStyle.enchantName_right}>
                {ENCHANTS_DATA[enchant]?.displayName}
              </p>
            )}
            <img
              className={gearModStyle.craftingQuality_ench}
              src={ENCHANTS_DATA[enchant]?.craftingQuality}
              alt=''
            />

            {position === 'left' && (
              <p className={gearModStyle.enchantName_left}>
                {ENCHANTS_DATA[enchant]?.displayName}
              </p>
            )}
          </div>
        )}

        <div>{ilvl}</div>
        <div style={{color: '#a300e7'}}>
          {armorData?.gear?.items[`${armors}`]?.['name']}
        </div>
      </div>
      {position === 'right' ? (
        <a href='#' data-wowhead={dataWowhead}>
          <img
            className={gearModStyle.gearImg}
            src={armorLinckImg || emptyIco}
            alt='Image'
          />
        </a>
      ) : (
        ''
      )}
    </div>
  )
}

export default ItemBlock
