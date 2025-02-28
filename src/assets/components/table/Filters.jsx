import React, {useCallback} from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Icon,
} from '@chakra-ui/react'
import {CiSearch} from 'react-icons/ci'
import StatusFilter from './StatusFilter'

const Filters = React.memo(({columnFilters, setColumnFilters}) => {
  const playerName = columnFilters.find(f => f.id === 'player')?.value || ''

  const onFilterChange = (id, value) => {
    setColumnFilters(prev => prev.filter(f => f.id !== id).concat({id, value}))
  }

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size='sm' maxW='12rem'>
        <InputLeftElement pointerEvents='none'>
          <Icon fill='#181818' as={CiSearch} />
        </InputLeftElement>
        <Input
          backgroundColor='#ffffff'
          placeholder='Поиск...'
          value={playerName}
          onChange={e => onFilterChange('player', e.target.value)}
        />
      </InputGroup>
      <StatusFilter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </HStack>
  )
})

export default Filters
