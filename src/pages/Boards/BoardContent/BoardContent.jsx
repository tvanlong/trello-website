import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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
  // Cùng 1 lúc chỉ có 1 thằng card hoặc column được active drag
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColums(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColums.find((column) => column.cards.map((card) => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    const { active } = event
    setActiveDragItemId(active?.id)
    setActiveDragItemType(active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(active?.data?.current)
  }

  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    if (!active || !over) return
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Không làm gì thêm nếu không tìm thấy column
    if (!activeColumn || !overColumn) return

    // Khi kéo thả card qua 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      setOrderedColums((prevColumns) => {
        const overCardIndex = overColumn.cards.findIndex((card) => card._id === overCardId)

        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

        // column cũ
        if (nextActiveColumn) {
          // Xóa card ở column active
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)
          // Cập nhật lại mảng cardOrderIds của column active
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
        }

        // column mới
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo thả có nằm trong column over hay không, nếu có thì xóa đi
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)
          // Thêm card vào column over
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // Cập nhật lại mảng cardOrderIds của column active
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
        }

        return nextColumns
      })
    }
  }

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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: 0.5 } } })
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColums} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
