import React, {useState, useEffect} from 'react'
import {Menu, MenuButton, MenuList, MenuItem, Box} from '@chakra-ui/react'
import {STATUSES} from './data'

export const ColorIcon = ({color, ...props}) => (
  <Box w='5' h='5' bg={color} borderRadius='3px' {...props} />
)

const StatusCell = React.memo(({getValue, row, column, table}) => {
  const currentStatus = getValue()
  const [value, setValue] = useState()

  const {updateData} = table.options.meta
  useEffect(() => {
    setValue(currentStatus)
  }, [currentStatus])
  // console.log('currentStatus:', currentStatus)

  return (
    <Menu>
      <MenuButton h='100%' w='100%' p={1.5} bg={value?.color}>
        {value?.name || 'syka'}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color='black' mr={3} />
          Clear
        </MenuItem>

        {STATUSES.map(status => (
          <MenuItem
            key={status.id}
            onClick={() => updateData(row.index, column.id, status)}
          >
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
})

export default StatusCell
