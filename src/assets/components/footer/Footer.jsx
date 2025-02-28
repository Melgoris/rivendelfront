import React from 'react'
import style from './style.module.css'

const FooterContainer = props => {
  return (
    <>
      <div className={style.section_separator_section_separator}></div>
      <div className={style.footer_container_footer_container}>
        <div className={style.footer_container_footer}>
          <div className={style.footer_container_social_links}></div>
          <div className={style.footer_container_copyright_container}>
            <span className={style.Anchor}>копиринг бай васян</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterContainer
