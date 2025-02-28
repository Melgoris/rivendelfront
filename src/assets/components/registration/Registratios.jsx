import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Navigate} from 'react-router-dom'
import style from './registration.module.css'
import {useForm} from 'react-hook-form'
import {
  fetchUserData,
  isAuthSelector,
  fetchRegister,
} from '../../../redux/slices/auth'

const Registratios = () => {
  const [isAuth, setIsAuth] = useState(false)
  const isAuthSel = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const [canEnter] = useState('uTa0Pj#&v3g^4D42')
  const [microCheck, setMicroCheeck] = useState('')
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      password: '',
      player: '',
      confPassword: '',
    },
    mode: 'onChange',
  })
  if (isAuthSel) {
    return <Navigate to='/cards' />
  }
  const onSubmit = async values => {
    const data = await dispatch(fetchUserData(values))
    if (!data.payload) {
      alert('Не удалось зайти в аккаунт')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  const onRegister = values => {
    dispatch(fetchRegister(values))
  }

  return (
    <section>
      <div className={style.container}>
        {isAuth ? (
          <div className={`${style.user} ${style.signinBx}`}>
            <div className={style.imgBx}>
              <img
                className={style.normalImage}
                src='/image/register.jpg'
                alt=''
              />
            </div>
            <div className={style.formBx}>
              <input
                className={style.error__}
                type='password'
                value={microCheck}
                onChange={e => setMicroCheeck(e.target.value)}
              />
              <form action='' onSubmit={handleSubmit(onSubmit)}>
                <h2>Войти</h2>

                <input
                  disabled={!(canEnter === microCheck)}
                  type='text'
                  placeholder='Username'
                  {...register('player', {required: 'Введите имя'})}
                />
                <input
                  type='password'
                  placeholder='Password'
                  {...register('password', {
                    required: 'Введите пароль',
                    minLength: {
                      value: 3,
                      message: 'Пароль должен быть не менее 3 символов',
                    },
                  })}
                />
                <input
                  disabled={!isValid}
                  type='submit'
                  name=''
                  value='Логин'
                />
                {errors.player && (
                  <p className='error-text'>{errors.player.message}</p>
                )}
                <p className={style.signup}>
                  Еще нет акка?
                  <Link to='#' onClick={() => setIsAuth(prev => !prev)}>
                    {' '}
                    Зарегай.
                  </Link>
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className={`${style.user} ${style.signupBx}`}>
            <div className={style.formBx}>
              <form action='' onSubmit={handleSubmit(onRegister)}>
                <input
                  className={style.error__}
                  type='password'
                  value={microCheck}
                  onChange={e => setMicroCheeck(e.target.value)}
                />
                <h2>Создать аккаунт</h2>
                <input
                  disabled={!(canEnter === microCheck)}
                  type='text'
                  placeholder='Username'
                  {...register('player', {required: 'Введите имя'})}
                />
                <input
                  type='password'
                  placeholder='Create Password'
                  {...register('password', {
                    required: 'Введите пароль',
                    minLength: {
                      value: 3,
                      message: 'Пароль должен быть не менее 3 символов',
                    },
                  })}
                />
                {errors.password && (
                  <p className='error-text'>{errors.password.message}</p>
                )}
                <input
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confPassword', {
                    required: 'Повторите пароль',
                    minLength: {
                      value: 3,
                      message: 'Пароль должен быть не менее 3 символов',
                    },
                    validate: value =>
                      value === watch('password') || 'Пароли не совпадают',
                  })}
                />
                {errors.confPassword && (
                  <p className='error-text'>{errors.confPassword.message}</p>
                )}
                <input disabled={!isValid} type='submit' value='Зарегать' />
                <p className={style.signup}>
                  Уже зареган?
                  <Link to='#' onClick={() => setIsAuth(prev => !prev)}>
                    {' '}
                    Войти.
                  </Link>
                </p>
              </form>
            </div>
            <div className={style.imgBx}>
              <img
                src='/image/register.jpg'
                alt=''
                className={style.mirroredImage}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Registratios
