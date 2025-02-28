import React, {useState} from 'react'
import DropIndicator from '../DropIndicator'
import {motion, AnimatePresence} from 'framer-motion'
import {
  useCharContext,
  getCharacters,
  getSetAirData,
} from '../../../../axiosData/charactersInfo'
import {GiCrossMark, GiCrossedChains} from 'react-icons/gi'
import {TbLockFilled} from 'react-icons/tb'
import {updateAirtable} from '../../../../axiosData/charactersInfo'
import useDoubleClick from './HandleHelper'
import SkeletonCards from './SkeletonCards'
import HeadingCont from '../../headingCont/HeadingCont'
import ToogleSaved from './toggleSaved/ToogleSaved'
import {useDispatch, useSelector} from 'react-redux'
import {
  addCardToColumn,
  fetchColumns,
  removeCardFromColumn,
} from '../../../../../redux/slices/columns'
import {fetchCards} from '../../../../../redux/slices/cards'

const CharsPanel = ({
  panel,
  charCardStyle,
  bazaCharov,
  vCard,
  CardsComponent,
  styleTitle,
  index,
  tabsName,
  collumnID,
}) => {
  const dispatch = useDispatch()
  const {cards, saved} = useSelector(store => store.cards)

  const skeletus =
    panel === 'left_panel' ? [...new Array(30)] : [...new Array(20)]
  const {
    // char,
    unsaved,
    setUnsaved,
    setChar,
    setIsOpengearModal,
    armorData,
    setArmorData,
    isLoadingSkeleton,
    charCopy,
    setCharCopy,
  } = useCharContext()
  const [active, setActive] = useState(false)

  const handleDragStart = (e, char) => {
    e.dataTransfer.setData('persName', char.name)
    e.dataTransfer.setData('persID', char._id)
    e.dataTransfer.setData('fromPanel', panel)
  }

  const handleDragEnd = async e => {
    const persName = e.dataTransfer.getData('persName')
    const fromPanel = e.dataTransfer.getData('fromPanel')
    const persID = e.dataTransfer.getData('persID')
    const indicators = getIndicators()
    const {element} = getClosestIndicator(e, indicators)
    const before = element.dataset.before || '-1'

    clearIndicators()
    setActive(false)

    if (fromPanel === panel && panel === 'right_panel') {
    } else if (fromPanel === 'left_panel' && panel === 'right_panel') {
      await dispatch(addCardToColumn({columnId: collumnID._id, cardId: persID}))
      await dispatch(fetchCards())
      await dispatch(fetchColumns())
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    setIndicator(e)
    setActive(true)
  }

  const handleDragLeave = () => {
    clearIndicators()
    setActive(false)
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-panel="${panel}"]`))
  }

  const getClosestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50
    const cli = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = e.clientY - (box.top + DISTANCE_OFFSET)
        if (offset < 0 && offset > closest.offset) {
          return {offset: offset, element: child}
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    )
    return cli
  }

  const clearIndicators = es => {
    const indicators = es || getIndicators()
    indicators.forEach(i => {
      i.style.opacity = '0'
    })
  }

  const setIndicator = e => {
    const indicators = getIndicators()
    clearIndicators(indicators)
    const ind = getClosestIndicator(e, indicators)
    ind.element.style.opacity = '1'
  }
  const deletePers = async pers => {
    await dispatch(
      removeCardFromColumn({columnId: collumnID._id, cardId: pers._id}),
    )
    await dispatch(fetchCards())
    await dispatch(fetchColumns())
  }

  const handleSingleClick = async (e, char) => {
    if (panel === 'right_panel') return
    setArmorData(char)
    setIsOpengearModal(prev => !prev)
    document.body.classList.add('modal-open')
    // const charactersArmor = await getCharacters(char.realm, char.name, 'gear')
  }

  const handleDoubleClick = async (e, char) => {
    console.log('Double click or tap')
  }

  const handleClick = useDoubleClick(handleDoubleClick, handleSingleClick)

  return (
    <>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={charCardStyle[`${panel}`]}
      >
        {/* <div className={charCardStyle[`${styleTitle}`]}>{title}</div> */}
        {bazaCharov.status === 'loading' &&
          skeletus.map((_, i) => {
            const rightPanel = panel === 'left_panel' ? true : false

            return (
              <div
                className={`${
                  panel === 'left_panel' ? charCardStyle.skeleton_left : ''
                }`}
                style={{margin: '8px'}}
                key={`${panel}-${i} - skeleton`}
              >
                <SkeletonCards key={i} panel={rightPanel} />
              </div>
            )
          })}
        <AnimatePresence>
          {bazaCharov?.items?.map((char, i) => {
            const closed = char.closed ? char.closed : ''
            const rightPanel = panel === 'left_panel' ? true : false
            const banner =
              char?.profile_banner !== ''
                ? `//cdn.raiderio.net/images/profile/masthead_backdrops/v2/${char?.profile_banner}.jpg`
                : `//cdn.raiderio.net/images/profile/masthead_backdrops/v2/${
                    char?.faction === 'horde'
                      ? 'hordebanner1'
                      : 'alliancebanner1'
                  }.jpg`

            return (
              <motion.div
                layout
                layoutId={`${panel}-${tabsName ? tabsName[index] : 'L'}-${
                  char.name
                }`}
                initial={{opacity: 0}}
                animate={{opacity: 1, transition: {duration: 0.5}}}
                exit={{opacity: 0, transition: {duration: 0.5}}}
                className={`${
                  panel === 'left_panel'
                    ? charCardStyle.card_block
                    : charCardStyle.card_block_v2
                }
                      ${rightPanel && closed && charCardStyle.blocked}`}
                key={`${panel}-${tabsName ? tabsName[index] : 'L'}-${
                  char.name
                }`}
              >
                <DropIndicator beforeName={char.name} panel={panel} />
                <div
                  // onTouchEnd={e => handleClick(e, char)}
                  draggable='true'
                  onDragStart={e => handleDragStart(e, char)}
                  onClick={e => handleClick(e, char)}
                  className={charCardStyle[`${vCard}`]}
                  key={`${i} - ${panel} - ${tabsName ? tabsName[index] : 'L'}`}
                  style={
                    banner
                      ? {
                          backgroundImage: `url(${banner})`,
                          backgroundSize: 'cover',
                        }
                      : ''
                  }
                >
                  <ToogleSaved
                    toogleSave={char.saved}
                    id={i}
                    panel={panel}
                    key={`${tabsName}-${char?.name}-${i}`}
                  />
                  {panel === 'right_panel' ? (
                    <GiCrossMark
                      className={charCardStyle.trash}
                      onClick={() => deletePers(char)}
                    />
                  ) : (
                    ''
                  )}
                  {rightPanel && closed && (
                    <GiCrossedChains className={charCardStyle.pistols} />
                  )}

                  <CardsComponent
                    char={char}
                    key={`${tabsName ? tabsName[index] : 'L'}-${
                      char?.name
                    }-${i}`}
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <DropIndicator beforeName={null} panel={panel} />
      </div>
    </>
  )
}

export default CharsPanel
