import React, {useState, useCallback, useEffect} from 'react'

import {useCharContext} from '../../../axiosData/charactersInfo'
import charCardStyle from './charCardStyle.module.css'
import CharsPanel from './charsPanel/CharsPanel'
import CharCards from './charCards/CharCards'
import UncavedTabs from './charTabs/UncavedTabs'
import HeadingCont from '../headingCont/HeadingCont'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCards} from '../../../../redux/slices/cards'
const CharsList = () => {
  const dispatch = useDispatch()
  const {cards} = useSelector(state => state.cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [])

  const {char, setUnsaved, setChar, charCopy} = useCharContext()
  // console.log('charchar', cards)
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    setChar(cards)
    const UNCAVED_BAZA = cards?.items.filter(prev => prev.closed === true)
    setUnsaved(UNCAVED_BAZA)
    // console.log('UNCAVED_BAZA', UNCAVED_BAZA)
  }, [cards])
  const removeFromLowDb = name => {
    setUnsaved(prevLowDb => prevLowDb.filter(item => item.name !== name))
  }

  // console.log('char', char)
  // console.log('charCopy', charCopy)
  return (
    <>
      <HeadingCont char={char} />
      <CharsPanel
        styleTitle='col_title'
        charCardStyle={charCardStyle}
        panel='left_panel'
        bazaCharov={cards}
        vCard='char_card'
        CardsComponent={CharCards}
        setCards={setChar}
      />
      <UncavedTabs charCardStyle={charCardStyle} />
    </>
  )
}

export default CharsList
