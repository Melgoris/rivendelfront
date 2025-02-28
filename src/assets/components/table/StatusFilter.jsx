import React from 'react'
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Text,
  PopoverBody,
  VStack,
  Icon,
} from '@chakra-ui/react'
import {MdFilterAlt} from 'react-icons/md'
import {ColorIcon} from './StatusCell'
import {STATUSES} from './data'

const StatusFilter = React.memo(({columnFilters, setColumnFilters}) => {
  const filterStatuses = columnFilters.find(f => f.id === 'status')?.value || []

  const toggleStatus = statusId => {
    setColumnFilters(prev => {
      const current = prev.find(f => f.id === 'status')?.value || []
      const updated = current.includes(statusId)
        ? current.filter(id => id !== statusId)
        : current.concat(statusId)

      return prev
        .filter(f => f.id !== 'status')
        .concat({id: 'status', value: updated})
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<Icon as={MdFilterAlt} />} size='sm' maxW='6rem'>
          Фильтр
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Text fontWeight='bold' mb={2}>
            Статус
          </Text>
          <VStack align='flex-start' spacing={1}>
            {STATUSES.map(status => (
              <Button
                key={status.id}
                onClick={() => toggleStatus(status.id)}
                leftIcon={<ColorIcon color={status.color} />}
                variant={
                  filterStatuses.includes(status.id) ? 'solid' : 'outline'
                }
              >
                {status.name}
              </Button>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
})

export default StatusFilter
