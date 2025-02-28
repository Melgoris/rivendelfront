import React from 'react'
import style from './loadData.module.css'

const LoadData = () => {
  return (
    <div className={`${style.loader} ${style.loader_1}`}>
      <div className={style.loader_outter}></div>
      <div className={style.loader_inner}></div>
    </div>
  )
}

export default LoadData
