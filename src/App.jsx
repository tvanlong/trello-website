import Button from '@mui/material/Button'
import { CheckCircle } from '@mui/icons-material'

function App() {
  return (
    <>
      <Button variant='text'>
        <CheckCircle
          sx={{
            color: 'green',
            marginRight: '10px'
          }}
        />
        Text
      </Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  )
}

export default App
