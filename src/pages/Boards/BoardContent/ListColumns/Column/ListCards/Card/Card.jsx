import { Card as MuiCard } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}
    >
      {!temporaryHideMedia && (
        <CardMedia
          sx={{ height: 140 }}
          image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
          title='green iguana'
        />
      )}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            paddingBottom: 1.5
          }
        }}
      >
        <Typography>MERN Stack</Typography>
      </CardContent>
      {!temporaryHideMedia && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button startIcon={<GroupIcon />} size='small'>
            20
          </Button>
          <Button startIcon={<CommentIcon />} size='small'>
            15
          </Button>
          <Button startIcon={<AttachmentIcon />} size='small'>
            10
          </Button>
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
