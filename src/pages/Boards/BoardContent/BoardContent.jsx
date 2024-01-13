import { useEffect, useState } from 'react'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      // Require the mouse to move by 10 pixels before activating
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      // Press delay of 250ms, with tolerance of 5px of movement
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColums, setOrderedColums] = useState([])

  useEffect(() => {
    setOrderedColums(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    // Kiểm tra nếu không có over thì return (kéo thả ngoài board)
    if (!over) return

    // Kiểm tra nếu active và over là 1 thằng thì return (kéo thả trong cùng 1 column)
    if (active.id !== over.id) {
      // Lấy vị trí cũ của column (từ thằng active)
      const oldIndex = orderedColums.findIndex((column) => column._id === active.id)
      // Lấy vị trí mới của column (từ thằng over)
      const newIndex = orderedColums.findIndex((column) => column._id === over.id)
      // Thay đổi vị trí của column trong mảng
      const dndOrderedColumns = arrayMove(orderedColums, oldIndex, newIndex)
      setOrderedColums(dndOrderedColumns)
      // Cập nhật lại vị trí của column trong board
      // const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
      // board.columnOrderIds = dndOrderedColumnIds
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColums} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
