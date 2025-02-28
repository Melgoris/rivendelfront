import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getTableById, getAllTable} from '../../../redux/slices/tantable'
import style from './tablestyle.module.css'

const TableSelector = () => {
  const [tables, setTables] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTables = async () => {
      const response = await dispatch(getAllTable())
      setTables(response.payload)
    }
    fetchTables()
  }, [])

  const handleSelectTable = async tableId => {
    await dispatch(getTableById({id: tableId}))
  }

  return (
    <div className={style.select_table}>
      <select
        style={{maxWidth: '150px'}}
        onChange={e => handleSelectTable(e.target.value)}
      >
        <option value=''>Выберите таблицу...</option>
        {tables.map(table => (
          <option key={table._id} value={table._id}>
            {table.tableName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TableSelector
