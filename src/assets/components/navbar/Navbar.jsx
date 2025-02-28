import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {isAuthSelector} from '../../../redux/slices/auth'
import {TbLogin} from 'react-icons/tb'
import {TbLogin2} from 'react-icons/tb'

import MainButton from '../button/MainButton'
import style from './navbar.module.css'
import logo from './image/logo.png'
// import rivLogo from '/image/rivendell_logo.png'
import {useSelector, useDispatch} from 'react-redux'
import {toggle} from '../../../redux/slices/auth'

const NavbarContainer = props => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  return (
    <div data-role='Header' className={style.navbar_container_navbar_container}>
      <div className={style.navbar_container_navbar}>
        <div className={style.navbar_container_left_side}>
          <Link to='/'>
            {' '}
            {/* <img alt={logo} src={rivLogo} className='navbar-container-image' /> */}
          </Link>
          <div
            data-role='BurgerMenu'
            className={style.navbar_container_burger_menu}
          >
            <svg
              viewBox='0 0 1024 1024'
              className={style.navbar_container_icon}
            >
              <path d='M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z'></path>
            </svg>
          </div>
          <div className={style.navbar_container_links_container}>
            <NavLink
              to='/'
              className={`${style.navbar_container_link} ${style.Anchor}`}
            >
              Таблица
            </NavLink>
            <NavLink
              to='/services/cards'
              className={`${style.navbar_container_link1} ${style.Anchor}`}
            >
              Карточки
            </NavLink>
            {/* <NavLink
              to='/table'
              className={`${style.navbar_container_link2} ${style.Anchor}`}
            >
              Таблица
            </NavLink> */}
            {/* <span className={`${style.navbar_container_link3} ${style.Anchor}`}>
              404 страничко
            </span> */}
          </div>
        </div>
        <div className={style.navbar_container_right_side}>
          {/* {!isAuth && <TbLogin className='login' />} */}
          {/* {isAuth && <MainButton MainButton={'ATATAT'} />} */}
        </div>
        {!isAuth && (
          <div className={style.login_container}>
            <TbLogin2 className='login' />
            <Link to='/login'>
              <span>Войти</span>
            </Link>
          </div>
        )}
        {isAuth && (
          <div className={style.login_container}>
            <TbLogin className={style.login} />
            {/* <Link to='/cards'> */}

            {/* <MainButton pers={'Добавить чара'} /> */}

            <span onClick={() => dispatch(toggle())}>Профиль</span>

            {/* </Link> */}
          </div>
        )}

        {/* мобильне меню */}
        <div
          data-role='MobileMenu'
          className={style.navbar_container_mobile_menu}
        >
          <div className={style.navbar_container_container}>
            <img
              alt={props.imageAlt1}
              src={props.imageSrc1}
              className={style.navbar_container_image1}
            />
            <div
              data-role='CloseMobileMenu'
              className={style.navbar_container_close_menu}
            >
              <svg
                viewBox='0 0 1024 1024'
                className={style.navbar_container_icon2}
              >
                <path d='M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z'></path>
              </svg>
            </div>
          </div>
          <div className={style.navbar_container_links_container1}>
            <a
              href='#resources'
              className={`${style.navbar_container_link4} ${style.Anchor}`}
            >
              {props.link4}
            </a>
            <a
              href='#inspiration'
              className={`${style.navbar_container_link5} ${style.Anchor}`}
            >
              {props.link5}
            </a>
            <a
              href='#process'
              className={`${style.navbar_container_link6} ${style.Anchor}`}
            >
              {props.link6}
            </a>
            <span className={`${style.navbar_container_link7} ${style.Anchor}`}>
              {props.link7}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarContainer
