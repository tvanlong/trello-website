import { useMemo } from 'react'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Column from './Column/Column'

function ListColumns({ columns }) {
  const columnIds = useMemo(() => {
    return columns?.map((column) => column._id)
  }, [columns])
  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {/* List of columns */}
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Box Add new column */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
        >
          <Button
            sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
            startIcon={<NoteAddIcon />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
