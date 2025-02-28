import React, {useRef, useEffect, createRef, useCallback, useMemo} from 'react'
import html2canvas from 'html2canvas'
import {useScreenshot, createFileName} from 'use-react-screenshot'
import style from './unsavedTabs.module.css'
import CharsPanel from '../charsPanel/CharsPanel'
import {IoMdAdd} from 'react-icons/io'
import MiniCard from '../../altCard/miniCard/MiniCard'
import {IoSaveSharp} from 'react-icons/io5'
import {FaSortAmountDown, FaSortAmountUpAlt, FaSort} from 'react-icons/fa'
import {BiScreenshot} from 'react-icons/bi'
import {GiCardRandom} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'
import {UNCAVED_TABS} from '../../../../charsDb/chars.js'
import Raid_buffs from './Raid_buffs.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {
  addNewColumn,
  fetchColumns,
  deleteColumnFromDb,
  fillColumnWithCharacters,
} from '../../../../../redux/slices/columns.js'

import ModalConfirm from './ModalConfirm.jsx'

const UncavedTabs = ({charCardStyle}) => {
  const dispatch = useDispatch()
  const {collumns, status} = useSelector(store => store.columns)
  const [selected, setSelected] = React.useState('')
  const [modalData, setModalData] = React.useState(null)
  const [unsCharacters, setUnsCharacters] = React.useState({
    fillChars: 0,
    pureChars: 0,
  })
  const filteredColumns = useMemo(() => collumns, [collumns])
  useEffect(() => {
    dispatch(fetchColumns())
  }, [])
  useEffect(() => {
    if (collumns?.length > 0 && !selected) {
      setSelected(collumns[0]._id)
    }
  }, [collumns])

  useEffect(() => {
    if (collumns.length === 0) {
      setSelected(null)
      setSelectedIndex(-1)
      return
    }
    if (selected && collumns.some(col => col._id === selected)) return

    let newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0
    if (newIndex >= collumns.length) newIndex = collumns.length - 1

    setSelected(collumns[newIndex]._id)
    setSelectedIndex(newIndex)
  }, [collumns])

  const [sortItems, setSortItems] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // const selectedIndex = collumns.indexOf(selected)
  // const setNewTab = (colId, index) => {
  //   setSelected(colId)
  //   setSelectedIndex(index)
  // }
  const setNewTab = useCallback((colId, index) => {
    setSelected(colId)
    setSelectedIndex(index)
  }, [])
  const ref = createRef(null)
  const sortUncavTabsItems = (tabs, i, localUncavedT) => {
    // dispatch(addNewColumn('ансейвед2'))
    // setSortItems(prev => !prev)
  }
  const [image, takeScreenshot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  })
  const download = (image, {name = 'img', extension = 'jpg'} = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }
  const downloadScreenshot = () => takeScreenshot(ref.current).then(download)
  //

  const delay = ms => new Promise(res => setTimeout(res, ms))
  const performWithRetries = async (action, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await action()
      } catch (error) {
        if (attempt === retries - 1) throw error
        await delay(1000)
      }
    }
  }

  const makeScreenshot = () => {
    const element = document.getElementById('screenshot')
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imgData
      link.download = 'screenshot.png'
      link.click()
    })
  }

  const addNewColumns = async () => {
    const result = await dispatch(
      addNewColumn(`ансейвед ${(collumns?.length + 1).toString()}`),
    )
    if (addNewColumn.fulfilled.match(result)) {
      dispatch(fetchColumns())
    }
  }
  const confirmDeleteCol = id => {
    setModalData({isOpen: true, columnId: id})
  }
  const handleInputChange = e => {
    const {name, value} = e.target

    if (!/^\d*$/.test(value)) return
    setUnsCharacters(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }
  const fillUnsavedColumn = async (columnId, numbData) => {
    const {fillChars, pureChars} = numbData
    await dispatch(fillColumnWithCharacters({columnId, fillChars, pureChars}))
  }

  return (
    <div className={style.wrapper}>
      <IoMdAdd className={style.add_new_tab} onClick={addNewColumns} />
      <nav>
        <div
          className={style.navBefore}
          style={{
            left: `${selectedIndex * (100 / collumns?.length)}%`,
            width: `${100 / collumns?.length}%`,
          }}
        ></div>
        {status === 'loaded' &&
          filteredColumns?.map((column, i) => (
            <label
              key={column?._id}
              htmlFor={column?.name}
              className={`${style.name} 
               ${selected === column?._id ? style.active : ''}
              `}
              onClick={() => setNewTab(column?._id, i)}
            >
              {selected === column?._id && (
                <ImCross
                  className={style.delete_col}
                  onClick={() => confirmDeleteCol(column?._id)}
                />
              )}
              {modalData?.isOpen && (
                <ModalConfirm
                  modalOpen={() => setModalData(null)}
                  text='удалить панель?'
                  columnId={modalData.columnId}
                />
              )}
              {column?.name}
            </label>
          ))}
      </nav>

      <div className={style.container}>
        <div className={style.content_box}>
          {status === 'loaded' &&
            filteredColumns?.map(
              (column, i) =>
                column._id === selected && (
                  <div
                    id='screenshot'
                    ref={ref}
                    className={style.content}
                    key={column?._id + i}
                  >
                    {/* <IoSaveOutline /> */}
                    <div className={style.save_sort}>
                      <IoSaveSharp
                        className={style.save_button}
                        title='Сохранить изменения'
                      />
                      <FaSort
                        className={style.save_button}
                        title='Сортировать'
                        onClick={() =>
                          sortUncavTabsItems(column, i, localUncavedT)
                        }
                      />
                      {sortItems ? (
                        <FaSortAmountDown className={style.save_button} />
                      ) : (
                        <FaSortAmountUpAlt className={style.save_button} />
                      )}
                      <BiScreenshot
                        className={style.save_button}
                        title='Скриншот'
                        // onClick={() => makeScreenshot()}
                        onClick={downloadScreenshot}
                      />
                      <GiCardRandom
                        onClick={() =>
                          fillUnsavedColumn(column?._id, unsCharacters)
                        }
                        title='Заполнить колонку'
                        className={style.save_button}
                      />
                      {/* //unsCharacters, setUnsCharacters */}
                      <input
                        name='fillChars'
                        value={unsCharacters.fillChars}
                        onChange={handleInputChange}
                        title='Число челов'
                        className={`${style.input_data} ${
                          Number(unsCharacters.fillChars) > 20
                            ? style.input_error
                            : ''
                        }`}
                      />
                      <input
                        name='pureChars'
                        value={unsCharacters.pureChars}
                        onChange={handleInputChange}
                        title='Число чистых'
                        className={`${style.input_data} ${
                          Number(unsCharacters.pureChars) > 20
                            ? style.input_error
                            : ''
                        }`}
                      />
                      <p>{i + 1} ансейв</p>
                    </div>
                    <div className={`${style.save_sort} ${style.buffs}`}>
                      <p>Баффы</p>
                      <Raid_buffs tabs={column.items} />
                    </div>

                    <CharsPanel
                      styleTitle='col_title'
                      collumnID={column}
                      charCardStyle={charCardStyle}
                      panel='right_panel'
                      bazaCharov={column}
                      vCard='char_card_v2'
                      CardsComponent={MiniCard}
                      index={selectedIndex}
                      tabsName={column.name}
                    />
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  )
}

export default UncavedTabs
