import {useCallback, useEffect, useState} from 'react'

const MouseDownHelper = (rootId, state) => {
  const [isOnPanel, setIsOnPanel] = useState(false)

  const onMouseUp = useCallback(
    e => {
      console.log('Мышь была отпущена вне панели')
    },
    [isOnPanel],
  )

  useEffect(() => {
    const rootElement = document.getElementById(rootId)
    if (rootElement) {
      document.addEventListener('mouseup', onMouseUpOutside)
    }

    //нижче убера обработчик коли копмонент размонтируеться
    return () => {
      if (rootElement) {
        document.removeEventListener('mouseup', onMouseUpOutside)
      }
    }
  }, [onMouseUp, rootId])

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])
}
export default MouseDownHelper
