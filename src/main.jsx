import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './style.css'
import {UseCharsContext} from './assets/axiosData/charactersInfo'
import Modal from 'react-modal'
import {Provider} from 'react-redux'
import store from './redux/store.js'

Modal.setAppElement(document.getElementById('root'))
ReactDOM.createRoot(document.getElementById('root')).render(
  <UseCharsContext>
    <Provider store={store}>
      <App />
    </Provider>
  </UseCharsContext>,
)
