import React from 'react'

import style from './style.module.css'

const NotFound = () => {
  return (
    <>
      <div className={style.maincontainer}></div>
      <h1 className={style.errorcode}>ERROR 404</h1>
      <div className={style.errortext}>Не туда клацнул, кабачок.</div>
    </>
  )
}

export default NotFound
