import React from 'react'

import style from './button.module.css'
import {useCharContext} from '../../axiosData/charactersInfo'

const MainButton = props => {
  const {pers} = props
  const {setIsOpenModal} = useCharContext()
  const openModal = () => {
    setIsOpenModal(prev => !prev)
    document.body.classList.add('modal-open')
  }
  return (
    <div className={style.btn_container}>
      <button onClick={openModal} className={style.btn_cta_btn}>
        {pers}
      </button>
    </div>
  )
}

export default MainButton
