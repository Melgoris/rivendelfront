import React, {useState} from 'react'
import style from './toogleSaved.module.css'

const ToogleSaved = ({toogleSave, id, panel}) => {
  const [isChecked, setIsChecked] = useState(toogleSave || false)

  const handleToggle = () => {
    setIsChecked(prev => !prev)

    // высрать логику
  }

  return panel === 'left_panel' ? (
    <>
      <div className={style.tg_list}>
        <div className={style.tg_list_item}>
          <input
            className={`${style.tgl} ${style.tgl_skewed}`}
            id={`cb_${id}`}
            type='checkbox'
            checked={isChecked}
            onChange={() => handleToggle()}
          />
          <label
            className={style.tgl_btn}
            data-tg-off='CD'
            data-tg-on='OK'
            htmlFor={`cb_${id}`}
          />
        </div>
      </div>
      {/* <div className={style.slideThree}>
        <p>{isChecked ? '' : 'SAVED'}</p>
      </div> */}
    </>
  ) : (
    <div className={style.cdSlide}>
      <p>{isChecked ? '' : 'CD'}</p>
    </div>
  )
}

export default ToogleSaved
