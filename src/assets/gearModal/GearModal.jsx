import React, {useState, useEffect, useRef, useMemo} from 'react'
import ReactModal from 'react-modal'
import gearModStyle from './gearModal.module.css'
import {useCharContext} from '../axiosData/charactersInfo'
import ItemBlock from './ItemBlock'
import ARMOR_SET, {SPECS_, BANNERS_, CLASS_COLORS} from './gearBaza'
import {color} from 'framer-motion'
import {RiCloseLargeFill} from 'react-icons/ri'

const GearModal = () => {
  const {openGearModal, setIsOpengearModal} = useCharContext()
  const {armorData} = useCharContext()
  const [setArr, setSetArr] = useState('')

  useEffect(() => {
    if (armorData?.gear?.items) {
      const filteredSetIds = Object.values(armorData.gear.items)
        .filter(item => item.tier)
        .map(item => item.item_id)
        .join(':')
      setSetArr(filteredSetIds)
    }
  }, [armorData])

  const closeGearModal = () => {
    document.body.classList.remove('modal-open')
    setIsOpengearModal(prev => !prev)
    setSetArr([])
  }

  return (
    <ReactModal
      className={gearModStyle.module_box}
      overlayClassName={gearModStyle.Overlay}
      isOpen={openGearModal}
      onRequestClose={closeGearModal}
      style={{
        content: {
          backgroundImage: `url(${
            SPECS_[`${armorData?.active_spec_name?.replace(/\s+/g, '')}`]
          })`,
          backgroundSize: 'cover',
          // backgroundPosition: 'left',
        },
      }}
    >
      {/* <div className={gearModStyle.container}> */}
      <img
        className={gearModStyle.banner}
        src={BANNERS_[`${armorData?.faction}`]}
      />
      <div className={gearModStyle.header}>{armorData?.name}</div>
      <div
        className={gearModStyle.header_right}
        style={{color: `${CLASS_COLORS[armorData?.class]}`}}
      >
        {armorData?.active_spec_name} {armorData?.class}
      </div>
      <div className={gearModStyle.header_left}>
        <p>{Math.ceil(armorData?.gear?.item_level_equipped)} </p> item level
      </div>

      <div className={`${gearModStyle.side} ${gearModStyle.left}`}>
        {ARMOR_SET.LEFT_ITEMS.map((e, i) => {
          return (
            <ItemBlock
              gearModStyle={gearModStyle}
              mainDiv={gearModStyle.item}
              position={'left'}
              armors={e}
              key={e + i}
              setArr={setArr}
            />
          )
        })}
      </div>

      <div className={gearModStyle.center_bottom}>
        <ItemBlock
          gearModStyle={gearModStyle}
          mainDiv={gearModStyle.center_left}
          position={'right'}
          armors={'mainhand'}
        />
        <ItemBlock
          gearModStyle={gearModStyle}
          mainDiv={gearModStyle.center_right}
          position={'left'}
          armors={'offhand'}
        />
        {/* {ARMOR_SET.WEAPONS.map(e => {
          return (
            <ItemBlock
              gearModStyle={gearModStyle}
              mainDiv={gearModStyle.center_left}
              position={'right'}
              armors={e}
              key={e}
            />
          )
        })} */}
      </div>

      <div className={`${gearModStyle.side} ${gearModStyle.right}`}>
        {ARMOR_SET.RIGHT_ITEMS.map((e, i) => {
          return (
            <ItemBlock
              gearModStyle={gearModStyle}
              mainDiv={gearModStyle.item}
              position={'right'}
              armors={e}
              key={e + i}
              setArr={setArr}
            />
          )
        })}
      </div>
      {/* </div> */}
      <RiCloseLargeFill
        className={gearModStyle.closeModal}
        onClick={closeGearModal}
      />
    </ReactModal>
  )
}

export default GearModal
