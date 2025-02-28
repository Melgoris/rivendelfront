import {useEffect, useRef, useState} from 'react'
import './App.css'

function App() {
  // Старые доски
  const [boards, setBoards] = useState([
    // ваш текущий массив досок
  ])

  // Новая область и массив
  const [newBoard, setNewBoard] = useState([])

  // Функция для перетаскивания элемента на новую доску
  const handleDropToNewBoard = e => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('itemId')
    const draggedItem = boards
      .flatMap(board => board.items)
      .find(item => item.id === Number(itemId))

    if (draggedItem) {
      setBoards(prevBoards => {
        const updatedBoards = prevBoards.map(board => ({
          ...board,
          items: board.items.filter(item => item.id !== Number(itemId)),
        }))
        return updatedBoards
      })

      setNewBoard(prevNewBoard => [...prevNewBoard, draggedItem])
    }
  }

  // Функции для перетаскивания элемента на старые доски (то же, что вы уже реализовали)

  // Возвращаемый JSX
  return (
    <>
      <div className='app'>
        {/* Рендер старых досок */}
        {boards.map(board => (
          <div
            className='board'
            key={board.id}
            // Добавляем обработчики для перетаскивания на старые доски
            onDragOver={e => dragOverHandlerBoard(e, board)}
            onDrop={e => onDropHandlerBoard(e, board)}
          >
            <div className='board__title'>{board.title}</div>
            {board.items.map(item => (
              <div
                key={item.id}
                className='item'
                draggable={true}
                onDragStart={e => dragStartHandler(e, board, item)}
                onDragEnd={e => dragEndHandler(e)}
              >
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Новая доска для перетаскивания элементов */}
      <div
        className='appV2'
        // Добавляем обработчики для перетаскивания на новую область
        onDragOver={e => dragOverHandlerNewBoard(e)}
        onDrop={e => handleDropToNewBoard(e)}
      >
        Новая доска
        {/* Рендер элементов на новой доске */}
        {newBoard.map(item => (
          <div
            key={item.id}
            className='item'
            draggable={true}
            onDragStart={e => dragStartHandler(e, null, item)}
            onDragEnd={e => dragEndHandler(e)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
