import React, {useEffect, useState, useRef} from 'react'
import AvatarUi from 'react-avatar-edit'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAvatarData} from '../../../redux/slices/avatar'

const Avatar = ({setAvaToggle}) => {
  const dispatch = useDispatch()
  const [src, setSrc] = useState(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isEdit, setIsEdit] = useState(true)
  const imageUploudRef = useRef(null)
  const userId = useSelector(state => state.auth.data._id)

  const onLoad = () => {
    dispatch(fetchAvatarData({_id: userId, avatar: preview}))
    setPreview(null)
    setIsEdit(false)
    setAvaToggle(false)
  }
  const onClose = () => {
    // setImage(preview)
    setAvaToggle(false)
    setPreview(null)
    setIsEdit(false)
  }
  const onCrop = view => {
    setPreview(view)
  }
  const onBeforeFileLoad = image => {
    if (image.target.files[0].size > 716800) {
      alert('File is too big!')
      image.target.value = ''
    }
  }

  return (
    <div>
      {isEdit && (
        <AvatarUi
          ref={imageUploudRef}
          width={170}
          height={170}
          onCrop={onCrop}
          onClose={onClose}
          cropRadius={80}
          minCropRadius={50}
          backgroundColor={'black'}
          onBeforeFileLoad={onBeforeFileLoad}
          labelStyle={{fontSize: 16}}
          label={'Выбрать аву'}
          src={src}
        />
      )}
      <div>
        <button onClick={onLoad}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  )
}

export default Avatar
