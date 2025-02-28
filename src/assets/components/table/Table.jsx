import React, {useState, useEffect, useMemo} from 'react'
import {ChakraProvider, ChakraBaseProvider} from '@chakra-ui/react'
import theme from './theme'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import {Box, Button, ButtonGroup, Text} from '@chakra-ui/react'
import Filters from './Filters'
import EditCell from './EditCell'
import StatusCell from './StatusCell'
import DATA, {STATUSES, DATA_} from './data'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {getAllPlayers} from '../../../redux/slices/players'
import {getLatestTable} from '../../../redux/slices/tantable'
import defAva from '/image/photo.png'
import tablestyle from './tablestyle.module.css'
import CreateTableModal from './CreateTableModal'
import TableSelector from './SelectTable'

const Table = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getLatestTable())
  }, [dispatch])
  const data = useSelector(state => state?.tantable?.table?.data)
  const tableRowCount = useSelector(
    state => state?.tantable?.table?.data?.footerRow?.dataColumns?.length,
  )
  const tableId = useSelector(state => state?.tantable?.table?.data?._id)
  const period = useSelector(
    state => state?.tantable?.table?.data?.period || '',
  )
  const daysCount = tableRowCount || 15

  // console.log('tableIdssssss', tableId)
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  console.log('columnFilters', columnFilters)
  const [footerRow, setFooterRow] = useState(Array(daysCount).fill(0))
  // const daysCount = players.player[0]?.dataColumns.length || 0
  const tableData = useMemo(() => {
    if (!data) return []
    return [...data.players, {...data.footerRow, isFooter: true}]
  }, [data])

  const columns = useMemo(() => {
    if (!tableId) return []
    return [
      {
        accessorKey: 'player',
        header: 'Игрок',
        cell: info =>
          info.row.original.isFooter ? (
            <Text style={{color: '#fff'}}>Рейдов</Text>
          ) : (
            <>
              <div className={tablestyle.img_container}>
                <img
                  className={tablestyle.avatar_}
                  src={info.getValue()?.avatar || defAva}
                  size='sm'
                />
              </div>
              <Text>{info.getValue()?.player}</Text>
            </>
          ),
      },
      ...Array.from({length: daysCount}, (_, i) => ({
        accessorKey: `dataColumns.${i}`,
        header: `${i + 1}`,
        cell: info => <EditCell tableId={data._id} {...info} />,
      })),
      {
        accessorKey: 'sum',
        header: 'Сум.',
        cell: info => <Text fontWeight='bold'>{info.getValue()}</Text>,
      },
    ]
  }, [tableId, daysCount])

  const table = useReactTable({
    columns,
    data: tableData || [],
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // meta: {updateData},
  })

  return (
    <ChakraBaseProvider theme={theme} resetCSS={false}>
      {isModalOpen && (
        <CreateTableModal onClose={() => setIsModalOpen(false)} />
      )}

      <div className={tablestyle.table_countainer}>
        <Box className={tablestyle.box_styles}>
          <Button
            className={tablestyle.button_new_table}
            onClick={() => setIsModalOpen(true)}
          >
            Создать таблицу
          </Button>
          <p className={tablestyle.period}>{`Период: по ${period}`}</p>
          <TableSelector />
          <Box className='table'>
            {table.getHeaderGroups().map(headerGroup => (
              <Box key={headerGroup.id} className='tr'>
                {headerGroup.headers.map(header => (
                  <Box
                    key={header.id}
                    className='th'
                    style={{width: header.getSize()}}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </Box>
                ))}
              </Box>
            ))}
            {table.getRowModel().rows.map(row => (
              <Box key={row.id} className='tr'>
                {row.getVisibleCells().map(cell => (
                  <Box
                    key={cell.id}
                    className='td'
                    style={{width: cell.column.getSize()}}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Text>
            Страница {table.getState().pagination.pageIndex + 1} из{' '}
            {table.getPageCount()}
          </Text>
        </Box>
      </div>
    </ChakraBaseProvider>
  )
}

export default Table
