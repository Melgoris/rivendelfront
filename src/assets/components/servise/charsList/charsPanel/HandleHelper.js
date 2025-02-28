import React, {useState, useEffect} from 'react'

const useDoubleClick = (onDoubleClick, onSingleClick) => {
  const [clickTimeout, setClickTimeout] = useState(null)

  const handleClick = (event, ...args) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      onDoubleClick(event, ...args)
    } else {
      setClickTimeout(
        setTimeout(() => {
          onSingleClick(event, ...args)
          setClickTimeout(null)
        }, 300),
      )
    }
  }

  return handleClick
}

export default useDoubleClick
