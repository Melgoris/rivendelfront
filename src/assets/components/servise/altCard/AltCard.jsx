import React from 'react'
// import './style.css'
import {useCharContext} from '../../../axiosData/charactersInfo'

const AltCard = () => {
  const {char} = useCharContext()

  const target = {
    clicked: 0,
    currentFollowers: 90,
    btn: document.querySelector('a.btn'),
    fw: document.querySelector('span.followers'),
  }

  const follow = () => {
    target.clicked += 1
    target.btn.innerHTML = 'Following <i className="fas fa-user-times"></i>'

    if (target.clicked % 2 === 0) {
      target.currentFollowers -= 1
      target.btn.innerHTML = 'Follow <i className="fas fa-user-plus"></i>'
    } else {
      target.currentFollowers += 1
    }

    target.fw.textContent = target.currentFollowers
    target.btn.classNameList.toggle('following')
  }

  return (
    <div className='services-cards-container'>
      <div className='card'>
        <div className='ds-top'></div>
        <div className='avatar-holder'>
          <img src={char.thumbnail_url} alt='Albert Einstein' />
        </div>
        <div className='name'>
          <a href='https://codepen.io/AlbertFeynman/' target='_blank'>
            Albert Feynman
          </a>
          <h6 title='Followers'>
            <i className='fas fa-users'></i>{' '}
            <span className='followers'>90</span>
          </h6>
        </div>
        <div className='button'>
          <a href='#' className='btn' onMouseDown={() => follow()}>
            Follow <i className='fas fa-user-plus'></i>
          </a>
        </div>
        <div className='ds-info'>
          <div className='ds pens'>
            <h6 title='Number of pens created by the user'>
              Pens <i className='fas fa-edit'></i>
            </h6>
            <p>29</p>
          </div>
          <div className='ds projects'>
            <h6 title='Number of projects created by the user'>
              Projects <i className='fas fa-project-diagram'></i>
            </h6>
            <p>0</p>
          </div>
          <div className='ds posts'>
            <h6 title='Number of posts'>
              Posts <i className='fas fa-comments'></i>
            </h6>
            <p>0</p>
          </div>
        </div>
        <div className='ds-skill'>
          <h6>
            Skill <i className='fa fa-code' aria-hidden='true'></i>
          </h6>
          <div className='skill html'>
            <h6>
              <i className='fab fa-html5'></i> HTML5{' '}
            </h6>
            <div className='bar bar-html'>
              <p>95%</p>
            </div>
          </div>
          <div className='skill css'>
            <h6>
              <i className='fab fa-css3-alt'></i> CSS3{' '}
            </h6>
            <div className='bar bar-css'>
              <p>90%</p>
            </div>
          </div>
          <div className='skill javascript'>
            <h6>
              <i className='fab fa-js'></i> JavaScript{' '}
            </h6>
            <div className='bar bar-js'>
              <p>75%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AltCard
