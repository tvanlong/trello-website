import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CheckCircle } from '@mui/icons-material'

function App() {
  return (
    <>
      <Typography variant='body2' color='text.secondary'>
        h1. Heading
      </Typography>
      <Button variant='text'>
        <CheckCircle
          sx={{
            color: 'green',
            marginRight: '10px'
          }}
        />
        Text
      </Button>
      <Button variant='contained' color='success'>
        Contained
      </Button>
      <Button variant='outlined'>Outlined</Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  )
}

export default App
