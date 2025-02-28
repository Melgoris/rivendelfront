import React, {useState, useEffect} from 'react'
import {Input} from '@chakra-ui/react'
import {useDispatch} from 'react-redux'
import {patchTable} from '../../../redux/slices/tantable'

const EditCell = React.memo(props => {
  const {tableId, getValue, row, column, table} = props

  const dispatch = useDispatch()
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  // console.log('value', value)
  // console.log('initialValue', initialValue)

  const onBlur = value => {
    if (value !== initialValue) {
      const playerId = row?.original?.player?._id || null
      const dataColumns = [...row.original.dataColumns]
      const colIndex = Number(column.id.split('_')[1])

      dataColumns[colIndex] = Number(value) || 0

      dispatch(patchTable({tableId: tableId, playerId, dataColumns}))
    }
  }

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      onBlur()
      e.target.blur()
    }
  }

  // useEffect(() => {
  //   setValue(initialValue)
  // }, [initialValue])

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => onBlur(value)}
      onKeyDown={onKeyDown}
      variant='flushed'
      size='sm'
      w='85%'
    />
  )
})

export default EditCell
