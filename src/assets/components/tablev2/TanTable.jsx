import React, {useState} from 'react'
import {DATA_} from '../table/data'
import style from './style.module.css'
// import {getCoreRowModel} from '@tanstack/[framework]-table'

const TanTable = () => {
  const [data, setData] = useState(DATA_)

  const table = useReactTable({
    columns,
    data,
    // getCoreRowModel: getCoreRowModel(),
  })
  return <div className={style.tan_body}>TanTable</div>
}

export default TanTable
