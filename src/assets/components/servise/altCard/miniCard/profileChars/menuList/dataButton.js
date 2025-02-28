import React, {useState} from 'react'
import LoadData from '../loading/LoadData'
import {GrUpdate} from 'react-icons/gr'
import {ImCross} from 'react-icons/im'

export const BUTTONS_ = [
  {
    text: 'Update',
    loadData: LoadData,
    update: GrUpdate,
  },
  {
    text: 'Delete',
    loadData: LoadData,
    update: ImCross,
  },
]
export default BUTTONS_
