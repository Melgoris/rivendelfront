import {useState} from 'react'
import {useDispatch} from 'react-redux'
import style from './tableModal.module.css'
import {setNewTable} from '../../../redux/slices/tantable'

const CreateTableModal = ({onClose}) => {
  const dispatch = useDispatch()
  const [tableName, setTableName] = useState('')
  const [period, setPeriod] = useState('')
  const [dayCount, setDayCount] = useState(15)

  const handleCreateTable = async () => {
    if (!tableName || !period) return alert('Введите все данные')
    await dispatch(setNewTable({tableName, period, dayCount}))
    onClose()
  }

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <h2>Создать новую таблицу</h2>
        <input
          type='text'
          placeholder='Название таблицы'
          value={tableName}
          onChange={e => setTableName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Период'
          value={period}
          onChange={e => setPeriod(e.target.value)}
        />
        <input
          type='number'
          placeholder='Количество дней'
          value={dayCount}
          onChange={e => setDayCount(Number(e.target.value))}
        />
        <button onClick={handleCreateTable}>Создать</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  )
}
export default CreateTableModal
